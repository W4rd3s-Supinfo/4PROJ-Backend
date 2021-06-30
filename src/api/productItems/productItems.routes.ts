import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import ProductItemsController from './productItems.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';
import JwtMiddleware from '../../common/middleware/permission/jwt.middleware';

class ProductItemsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductItemsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/productItems')
      .get([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        ProductItemsController.listProductItems,
      ])
      .post([
        body('name').isString(),
        body('ownerId').isString(),
        body('gpsCord').isString(),
        body('maxCapacity').isNumeric(),
        body('productList').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ProductItemsController.createProductItem,
      ]);

    this.app.param('productItemId', UrlParamsExtractorMiddleware.urlParamsExtractor(['productItemId'], ['id']));

    this.app.route('/productItems/:productItemId')
      .all([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(ProductItemsController.getProductItemById)
      .delete(ProductItemsController.removeProductItem);

    this.app.put('/productItems/:productItemId', [
      body('name').isString(),
      body('ownerId').isString(),
      body('gpsCord').isString(),
      body('maxCapacity').isNumeric(),
      body('productList').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductItemsController.putProductItem,
    ]);

    this.app.patch('/productItems/:productItemId', [
      body('name').isString().optional(),
      body('ownerId').isString().optional(),
      body('gpsCord').isString().optional(),
      body('maxCapacity').isNumeric().optional(),
      body('productList').isArray().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductItemsController.patchProductItem,
    ]);

    return this.app;
  }
}

export default ProductItemsRoutes;
