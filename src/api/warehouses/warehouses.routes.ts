import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import WarehousesController from './warehouses.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';
import JwtMiddleware from '../../common/middleware/permission/jwt.middleware';

class WarehousesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'WarehousesRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/warehouses')
      .get([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        WarehousesController.listWarehouses,
      ])
      .post([
        body('name').isString(),
        body('ownerId').isString(),
        body('gpsCord').isString(),
        body('maxCapacity').isNumeric(),
        body('productList').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        WarehousesController.createWarehouse,
      ]);

    this.app.param('warehouseId', UrlParamsExtractorMiddleware.urlParamsExtractor(['warehouseId'], ['id']));

    this.app.route('/warehouses/:warehouseId')
      .all([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(WarehousesController.getWarehouseById)
      .delete(WarehousesController.removeWarehouse);

    this.app.put('/warehouses/:warehouseId', [
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
      WarehousesController.putWarehouse,
    ]);

    this.app.patch('/warehouses/:warehouseId', [
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
      WarehousesController.patchWarehouse,
    ]);

    this.app.param('userId', UrlParamsExtractorMiddleware.urlParamsExtractor(['userId'], ['userId']));

    this.app.route('/warehouses/:userId')
      .get([
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        WarehousesController.getWarehousesByOwner,
      ]);

    return this.app;
  }
}

export default WarehousesRoutes;
