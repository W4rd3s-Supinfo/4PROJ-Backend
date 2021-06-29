import express from 'express';
import debug from 'debug';
import UserService from './users.service';

const log: debug.IDebugger = debug('app:users-middleware');

class UsersMiddleware {
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await UserService.readById(req.params.userId);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`],
      });
    }
  }

  async userCantChangePermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (
      'permissionFlags' in req.body
      && req.body.permissionFlags !== res.locals.user.permissionFlags
    ) {
      return res.status(400).send({
        errors: ['User cannot change permission flags'],
      });
    }
    return next();
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body.email) {
      const user = await UserService.getUserByEmail(req.body.email);
      if (user) {
        return res.status(400).send({ errors: ['User email already exists'] });
      }
    }
    return next();
  }
}

export default new UsersMiddleware();
