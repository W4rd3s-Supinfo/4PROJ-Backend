import express from 'express';
import debug from 'debug';
import OrdersService from './orders.service';

const log: debug.IDebugger = debug('app:Orders-controller');

class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const orders = await OrdersService.list();
    res.status(200).send(orders);
  }

  async getOrderById(req: express.Request, res: express.Response) {
    const order = await OrdersService.readById(req.body.id);
    res.status(200).send(order);
  }

  async getOrdersByUser(req: express.Request, res: express.Response) {
    const orders = await OrdersService.readByUser(req.body.id);
    res.status(200).send(orders);
  }

  async getOrdersByStatus(req: express.Request, res: express.Response) {
    const orders = await OrdersService.readByStatus(req.body.status);
    res.status(200).send(orders);
  }

  async createOrder(req: express.Request, res: express.Response) {
    const orderId = await OrdersService.create(req.body);
    res.status(201).send({ id: orderId });
  }

  async patchOrder(req: express.Request, res: express.Response) {
    log(await OrdersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putOrder(req: express.Request, res: express.Response) {
    log(await OrdersService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeOrder(req: express.Request, res: express.Response) {
    log(await OrdersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new OrdersController();
