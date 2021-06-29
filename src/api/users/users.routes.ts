import express from 'express';
import { body } from 'express-validator';
import CommonRoutesConfig from '../../common/route.config';
import UsersMiddleware from './users.middleware';
import UsersController from './users.controller';
import PermissionMiddleware from '../../common/middleware/permission/permission.middleware';
import PermissionFlag from '../../common/middleware/permission/permissionFlag.enum';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import UrlParamsExtractorMiddleware from '../../common/middleware/urlParamsExtractor.middleware';

class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/users')
      .get([/* jwt */
        PermissionMiddleware.permissionFlagRequired(PermissionFlag.ALL_PERMISSION),
        UsersController.listUsers,
      ])
      .post([
        body('fullName').isString(),
        body('email').isEmail(),
        body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser,
      ]);

    this.app.param('userId', UrlParamsExtractorMiddleware.urlParamsExtractor(['userId'], ['id']));

    this.app.route('/users/:userId')
      .all([
        UsersMiddleware.validateUserExists,
        /* jwt */
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      ])
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put('/users/:userId', [
      body('fullName').isString(),
      body('email').isEmail(),
      body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
      body('phone').isString(),
      body('address').isString(),
      body('zipCode').isString(),
      body('city').isString(),
      body('permissionFlags').isInt(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      UsersMiddleware.validateSameEmailDoesntExist,
      UsersMiddleware.userCantChangePermission,
      UsersController.putUser,
    ]);

    this.app.patch('/users/:userId', [
      body('fullName').isString().optional(),
      body('email').isEmail().optional(),
      body('password').isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)').optional(),
      body('phone').isString().optional(),
      body('address').isString().optional(),
      body('zipCode').isString().optional(),
      body('city').isString().optional(),
      body('permissionFlags').isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      UsersMiddleware.validateSameEmailDoesntExist,
      UsersMiddleware.userCantChangePermission,
      UsersController.patchUser,
    ]);
    return this.app;
  }
}

export default UsersRoutes;
