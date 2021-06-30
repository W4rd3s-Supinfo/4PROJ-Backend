import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import OrdersController from './orders.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';
import JwtMiddleware from '../../common/middleware/permission/jwt.middleware';

class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/orders')
      .get([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        OrdersController.listOrders,
      ])
      .post([
        body('name').isString(),
        body('ownerId').isString(),
        body('gpsCord').isString(),
        body('maxCapacity').isNumeric(),
        body('productList').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        OrdersController.createOrder,
      ]);

    this.app.param('orderId', UrlParamsExtractorMiddleware.urlParamsExtractor(['orderId'], ['id']));

    this.app.route('/orders/:orderId')
      .all([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(OrdersController.getOrderById)
      .delete(OrdersController.removeOrder);

    this.app.put('/orders/:orderId', [
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
      OrdersController.putOrder,
    ]);

    this.app.patch('/orders/:orderId', [
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
      OrdersController.patchOrder,
    ]);

    this.app.param('userId', UrlParamsExtractorMiddleware.urlParamsExtractor(['userId'], ['userId']));

    this.app.route('/orders/:userId')
      .get([
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        OrdersController.getOrdersByUser,
      ]);

    this.app.param('status', UrlParamsExtractorMiddleware.urlParamsExtractor(['status'], ['status']));

    this.app.route('/orders/:status')
      .get([
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        OrdersController.getOrdersByStatus,
      ]);

    return this.app;
  }
}

export default OrdersRoutes;
