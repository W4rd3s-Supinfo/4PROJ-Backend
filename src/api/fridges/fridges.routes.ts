import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import FridgesController from './fridges.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';

class FridgesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'FridgesRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/fridges')
      .get([
        /* jwt */
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        FridgesController.listFridges,
      ])
      .post([
        body('name').isString(),
        body('ownerId').isString(),
        body('productList').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        FridgesController.createFridge,
      ]);

    this.app.param('fridgeId', UrlParamsExtractorMiddleware.urlParamsExtractor(['fridgeId'], ['id']));

    this.app.route('/fridges/:fridgeId')
      .all([
        /* jwt */
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(FridgesController.getFridgeById)
      .delete(FridgesController.removeFridge);

    this.app.put('/fridges/:fridgeId', [
      body('name').isString(),
      body('ownerId').isString(),
      body('productList').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      FridgesController.putFridge,
    ]);

    this.app.patch('/fridges/:fridgeId', [
      body('name').isString().optional(),
      body('ownerId').isString().optional(),
      body('productList').isArray().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.CLIENT_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      FridgesController.patchFridge,
    ]);

    this.app.param('userId', UrlParamsExtractorMiddleware.urlParamsExtractor(['userId'], ['userId']));

    this.app.route('/fridges/:userId')
      .get([
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.CLIENT_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        FridgesController.getFridgesByOwner,
      ]);

    return this.app;
  }
}

export default FridgesRoutes;
