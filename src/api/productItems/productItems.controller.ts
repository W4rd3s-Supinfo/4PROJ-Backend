import express from 'express';
import debug from 'debug';
import ProductItemsService from './productItems.service';

const log: debug.IDebugger = debug('app:ProductItems-controller');

class ProductItemsController {
  async listProductItems(req: express.Request, res: express.Response) {
    const productItems = await ProductItemsService.list();
    res.status(200).send(productItems);
  }

  async getProductItemById(req: express.Request, res: express.Response) {
    const productItem = await ProductItemsService.readById(req.body.id);
    res.status(200).send(productItem);
  }

  async createProductItem(req: express.Request, res: express.Response) {
    const productItemId = await ProductItemsService.create(req.body);
    res.status(201).send({ id: productItemId });
  }

  async patchProductItem(req: express.Request, res: express.Response) {
    log(await ProductItemsService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putProductItem(req: express.Request, res: express.Response) {
    log(await ProductItemsService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeProductItem(req: express.Request, res: express.Response) {
    log(await ProductItemsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new ProductItemsController();
