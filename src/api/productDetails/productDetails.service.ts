import CRUD from '../../common/interfaces/crud.interface';
import TransportTypeModel from '../../models/ProductDetail.model';
import { CreateProductDetailDto, PatchProductDetailDto, PutProductDetailDto } from './productDetails.dto';

class ProductDetailsService implements CRUD {
  async create(ressource: CreateProductDetailDto) {
    return TransportTypeModel.addProductDetail(ressource);
  }

  async patchById(id: string, ressource: PatchProductDetailDto) {
    return TransportTypeModel.updateProductDetailById(id, ressource);
  }

  async putById(id: string, ressource: PutProductDetailDto) {
    return TransportTypeModel.updateProductDetailById(id, ressource);
  }

  async deleteById(id: string) {
    return TransportTypeModel.removeProductDetailById(id);
  }

  async list() {
    return TransportTypeModel.getProductDetails();
  }

  async readById(id: string) {
    return TransportTypeModel.getProductDetailById(id);
  }

  async readByProducer(id: string) {
    return TransportTypeModel.getProductDetailByProducer(id);
  }
}

export default new ProductDetailsService();
