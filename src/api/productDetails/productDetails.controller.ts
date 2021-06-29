import express from 'express';
import debug from 'debug';
import ProductDetailsService from './productDetails.service';

const log: debug.IDebugger = debug('app:ProductDetails-controller');

class ProductDetailsController {
  async listProductDetails(req: express.Request, res: express.Response) {
    const productDetails = ProductDetailsService.list();
    res.status(200).send(productDetails);
  }

  async getProductDetailById(req: express.Request, res: express.Response) {
    const productDetail = ProductDetailsService.readById(req.body.id);
    res.status(200).send(productDetail);
  }

  async getProductDetailsByProducer(req: express.Request, res: express.Response) {
    const productDetails = ProductDetailsService.readByProducer(req.body.producerId);
    res.status(200).send(productDetails);
  }

  async createProductDetail(req: express.Request, res: express.Response) {
    const productDetailId = await ProductDetailsService.create(req.body);
    res.status(201).send({ id: productDetailId });
  }

  async patchProductDetail(req: express.Request, res: express.Response) {
    log(await ProductDetailsService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async putProductDetail(req: express.Request, res: express.Response) {
    log(await ProductDetailsService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeProductDetail(req: express.Request, res: express.Response) {
    log(await ProductDetailsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new ProductDetailsController();
