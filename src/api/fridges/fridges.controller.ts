import express from 'express';
import debug from 'debug';
import FridgesService from './fridges.service';

const log: debug.IDebugger = debug('app:Fridges-controller');

class FridgesController {
  async listFridges(req: express.Request, res: express.Response) {
    const fridges = FridgesService.list();
    res.status(200).send(fridges);
  }

  async getFridgeById(req: express.Request, res: express.Response) {
    const fridge = FridgesService.readById(req.body.id);
    res.status(200).send(fridge);
  }

  async getFridgesByOwner(req: express.Request, res: express.Response) {
    const fridges = FridgesService.readByOwner(req.body.userId);
    res.status(200).send(fridges);
  }

  async createFridge(req: express.Request, res: express.Response) {
    const fridgeId = await FridgesService.create(req.body);
    res.status(201).send({ id: fridgeId });
  }

  async patchFridge(req: express.Request, res: express.Response) {
    log(await FridgesService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putFridge(req: express.Request, res: express.Response) {
    log(await FridgesService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeFridge(req: express.Request, res: express.Response) {
    log(await FridgesService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new FridgesController();
