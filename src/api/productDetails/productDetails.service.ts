import CRUD from '../../common/interfaces/crud.interface';
import ProductDetailModel from '../../models/ProductDetail.model';
import { CreateProductDetailDto, PatchProductDetailDto, PutProductDetailDto } from './productDetails.dto';

class ProductDetailsService implements CRUD {
  async create(ressource: CreateProductDetailDto) {
    return ProductDetailModel.addProductDetail(ressource);
  }

  async patchById(id: string, ressource: PatchProductDetailDto) {
    return ProductDetailModel.updateProductDetailById(id, ressource);
  }

  async putById(id: string, ressource: PutProductDetailDto) {
    return ProductDetailModel.updateProductDetailById(id, ressource);
  }

  async deleteById(id: string) {
    return ProductDetailModel.removeProductDetailById(id);
  }

  async list(limit:number, page:number) {
    return ProductDetailModel.getProductDetails(limit, page);
  }

  async readById(id: string) {
    return ProductDetailModel.getProductDetailById(id);
  }

  async readByProducer(producerId: string, limit: number, page: number) {
    return ProductDetailModel.getProductDetailByProducer(producerId, limit, page);
  }

  async count() {
    return ProductDetailModel.getCount();
  }
}

export default new ProductDetailsService();
