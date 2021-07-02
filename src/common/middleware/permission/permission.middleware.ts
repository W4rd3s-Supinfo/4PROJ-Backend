import express from 'express';
import debug from 'debug';
import PermissionFlag from './permissionFlag.enum';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        const userPermissionFlag = parseInt(res.locals.jwt.permissionFlag, 10);
        if (userPermissionFlag & requiredPermissionFlag) {
          return next();
        }
        return res.sendStatus(403);
      } catch (e) {
        log(e);
        return res.sendStatus(500);
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const userPermissionFlag = parseInt(res.locals.jwt.permissionFlag, 10);
      if (
        req.params
        && req.params.userId
        && req.params.userId === res.locals.jwt.userId
      ) {
        return next();
      }
      if (userPermissionFlag & PermissionFlag.ALL_PERMISSION) {
        return next();
      }
      return res.sendStatus(403);
    } catch (e) {
      log(e);
      return res.sendStatus(500);
    }
  }
}

export default new CommonPermissionMiddleware();
