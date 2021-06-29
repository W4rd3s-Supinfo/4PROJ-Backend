import express from 'express';
import debug from 'debug';
import WarehousesService from './warehouses.service';

const log: debug.IDebugger = debug('app:Warehouses-controller');

class WarehousesController {
  async listWarehouses(req: express.Request, res: express.Response) {
    const warehouses = WarehousesService.list();
    res.status(200).send(warehouses);
  }

  async getWarehouseById(req: express.Request, res: express.Response) {
    const warehouse = WarehousesService.readById(req.body.id);
    res.status(200).send(warehouse);
  }

  async getWarehousesByOwner(req: express.Request, res: express.Response) {
    const warehouses = WarehousesService.readByOwner(req.body.userId);
    res.status(200).send(warehouses);
  }

  async createWarehouse(req: express.Request, res: express.Response) {
    const warehouseId = await WarehousesService.create(req.body);
    res.status(201).send({ id: warehouseId });
  }

  async patchWarehouse(req: express.Request, res: express.Response) {
    log(await WarehousesService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putWarehouse(req: express.Request, res: express.Response) {
    log(await WarehousesService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeWarehouse(req: express.Request, res: express.Response) {
    log(await WarehousesService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new WarehousesController();
