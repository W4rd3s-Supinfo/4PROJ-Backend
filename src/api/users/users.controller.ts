import express from 'express';
import debug from 'debug';
import UsersService from './users.service';

const log: debug.IDebugger = debug('app:Users-controller');

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = UsersService.list();
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = UsersService.readById(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    const userId = await UsersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async patchUser(req: express.Request, res: express.Response) {
    log(await UsersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putUser(req: express.Request, res: express.Response) {
    log(await UsersService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await UsersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new UsersController();
