import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import TransportTypesController from './transportTypes.controller';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';
import JwtMiddleware from '../../common/middleware/permission/jwt.middleware';

class transportTypesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'TransportTypesRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/transporttypes')
      .get([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
        TransportTypesController.listTransportTypes,
      ])
      .post([
        body('name').isString(),
        body('carbon').isNumeric(),
        body('price').isNumeric(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        TransportTypesController.createTransportType,
      ]);

    this.app.param('transportId', UrlParamsExtractorMiddleware.urlParamsExtractor(['transportId'], ['id']));

    this.app.route('/users/:transportId')
      .all([
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(
          PermissionFlag.PRODUCER_PERMISSION
          | PermissionFlag.SELLER_PERMISSION
          | PermissionFlag.ALL_PERMISSION,
        ),
      ])
      .get(TransportTypesController.getTransportTypeById)
      .delete(TransportTypesController.removeTransportType);

    this.app.put('/users/:transportId', [
      body('name').isString(),
      body('carbon').isNumeric(),
      body('price').isNumeric(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      TransportTypesController.putTransportType,
    ]);

    this.app.patch('/users/:transportId', [
      body('name').isString().optional(),
      body('carbon').isNumeric().optional(),
      body('price').isNumeric().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(
        PermissionFlag.PRODUCER_PERMISSION
        | PermissionFlag.SELLER_PERMISSION
        | PermissionFlag.ALL_PERMISSION,
      ),
      TransportTypesController.patchTransportType,
    ]);

    return this.app;
  }
}

export default transportTypesRoutes;
