import express from 'express';
import debug from 'debug';
import TransportTypesService from './transportTypes.service';

const log: debug.IDebugger = debug('app:TransportTypes-controller');

class TransportTypesController {
  async listTransportTypes(req: express.Request, res: express.Response) {
    const transportTypes = await TransportTypesService.list();
    res.status(200).send(transportTypes);
  }

  async getTransportTypeById(req: express.Request, res: express.Response) {
    const transportType = await TransportTypesService.readById(req.body.id);
    res.status(200).send(transportType);
  }

  async createTransportType(req: express.Request, res: express.Response) {
    const transportTypeId = await TransportTypesService.create(req.body);
    res.status(201).send({ id: transportTypeId });
  }

  async patchTransportType(req: express.Request, res: express.Response) {
    log(await TransportTypesService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putTransportType(req: express.Request, res: express.Response) {
    log(await TransportTypesService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeTransportType(req: express.Request, res: express.Response) {
    log(await TransportTypesService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new TransportTypesController();
