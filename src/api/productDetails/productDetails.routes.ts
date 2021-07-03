import express from 'express';
import { body, query } from 'express-validator';
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
        query('limit').isInt().optional(),
        query('page').default(0).isInt({ min: 0 }),
        query('owner').isString().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
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
        body('baseCarbon').isNumeric(),
        body('producerId').isString(),
        body('producerPrice').isNumeric(),
        body('composition').isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ProductDetailsController.createProductDetail,
      ]);

    this.app.get('/productDetails/count', [
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductDetailsController.getCount,
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
      body('baseCarbon').isNumeric(),
      body('producerId').isString(),
      body('producerPrice').isNumeric(),
      body('composition').isString(),
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
      body('name').isString(),
      body('baseCarbon').isNumeric(),
      body('producerId').isString(),
      body('producerPrice').isNumeric(),
      body('composition').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      ProductDetailsController.patchProductDetail,
    ]);

    return this.app;
  }
}

export default ProductDetailsRoutes;
