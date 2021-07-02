import express from 'express';
import debug from 'debug';
import ProductDetailsService from './productDetails.service';

const log: debug.IDebugger = debug('app:ProductDetails-controller');

class ProductDetailsController {
  async listProductDetails(req: express.Request, res: express.Response) {
    let productDetails;
    if (!req.query.owner) {
      productDetails = await ProductDetailsService
        .list(
          parseInt(req.query.limit as string, 10),
          parseInt(req.query.page as string, 10),
        );
    } else {
      productDetails = await ProductDetailsService.readByProducer(
          req.query.owner as string,
          parseInt(req.query.limit as string, 10),
          parseInt(req.query.page as string, 10),
      );
    }
    res.status(200).send(productDetails);
  }

  async getProductDetailById(req: express.Request, res: express.Response) {
    const productDetail = await ProductDetailsService.readById(req.body.id);
    res.status(200).send(productDetail);
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

  async getCount(req: express.Request, res: express.Response) {
    const count = await ProductDetailsService.count();
    res.status(200).send({ count });
  }
}

export default new ProductDetailsController();
