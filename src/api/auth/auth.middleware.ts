import express from 'express';
import bcrypt from 'bcrypt';
import UserService from '../users/users.service';

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user: any = await UserService.getUserByEmailWithPassword(
      req.body.email,
    );
    if (user) {
      const passwordHash = user.password;
      if (await bcrypt.compare(req.body.password, passwordHash)) {
        return next();
      }
    }
    return res.status(400).send({ errors: ['Invalid email and/or password'] });
  }
}

export default new AuthMiddleware();
