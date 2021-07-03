import express from 'express';
import debug from 'debug';
import ProductItemsService from './productItems.service';
import ProductDetailsService from '../productDetails/productDetails.service';

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

  async countByDetailId(req: express.Request, res: express.Response) {
    const count = await ProductItemsService.countByDetailId(req.query.detailId as string);
    res.status(200).send({ count });
  }

  async removeByDetailId(req: express.Request, res: express.Response) {
    log(await ProductItemsService.removeByDetailId(req.query.detailId as string, parseInt(req.query.count as string, 10)));
    res.status(204).send();
  }

  async addByDetailId(req: express.Request, res: express.Response) {
    for (let i = 0; i < parseInt(req.query.count as string, 10); i += 1) {
      const mDate = new Date();
      mDate.setDate(mDate.getDate() + 14);
      // eslint-disable-next-line no-await-in-loop
      const mItem = await ProductDetailsService.readById(req.query.detailId as string);
      // eslint-disable-next-line no-await-in-loop
      await ProductItemsService.create({
        detailId: req.query.detailId as string,
        totalCarbon: mItem.baseCarbon,
        marketPrice: mItem.producerPrice + 1,
        expirationDate: mDate,
      });
    }
    res.status(204).send();
  }
}

export default new ProductItemsController();
