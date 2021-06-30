import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import ProductDetailsController from './productDetails.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';
import JwtMiddleware from '../../common/middleware/permission/jwt.middleware';

class ProductDetailsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductDetailsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/productDetails')
      .get([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        ProductDetailsController.listProductDetails,
      ])
      .post([
        body('name').isString(),
        body('ownerId').isString(),
        body('gpsCord').isString(),
        body('maxCapacity').isNumeric(),
        body('productList').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ProductDetailsController.createProductDetail,
      ]);

    this.app.param('productDetailId', UrlParamsExtractorMiddleware.urlParamsExtractor(['productDetailId'], ['id']));

    this.app.route('/productDetails/:productDetailId')
      .all([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(ProductDetailsController.getProductDetailById)
      .delete(ProductDetailsController.removeProductDetail);

    this.app.put('/productDetails/:productDetailId', [
      body('name').isString(),
      body('ownerId').isString(),
      body('gpsCord').isString(),
      body('maxCapacity').isNumeric(),
      body('productList').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductDetailsController.putProductDetail,
    ]);

    this.app.patch('/productDetails/:productDetailId', [
      body('name').isString().optional(),
      body('ownerId').isString().optional(),
      body('gpsCord').isString().optional(),
      body('maxCapacity').isNumeric().optional(),
      body('productList').isArray().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductDetailsController.patchProductDetail,
    ]);

    this.app.param('producerId', UrlParamsExtractorMiddleware.urlParamsExtractor(['producerId'], ['producerId']));

    this.app.route('/productDetails/:producerId')
      .get([
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        ProductDetailsController.getProductDetailsByProducer,
      ]);

    return this.app;
  }
}

export default ProductDetailsRoutes;
