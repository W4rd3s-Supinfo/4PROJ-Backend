import express from 'express';
import { body } from 'express-validator';
import BodyValidationMiddleware from '../../common/middleware/bodyValidation.middleware';
import CommonRoutesConfig from '../../common/route.config';
import authController from './auth.controller';
import authMiddleware from './auth.middleware';

class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post('/auth', [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    return this.app;
  }
}

export default AuthRoutes;
