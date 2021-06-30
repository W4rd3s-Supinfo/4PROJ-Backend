import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import envVars from '../../config/env';

const log: debug.IDebugger = debug('app:Auth-controller');

const tokenExpirationInSeconds = 36000;

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const token = jwt.sign(req.body.user, envVars.jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      return res
        .status(201)
        .send(token);
    } catch (err) {
      log('createJWT error: %O', err);
      return res.status(500).send();
    }
  }
}

export default new AuthController();
