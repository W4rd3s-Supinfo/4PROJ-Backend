import CRUD from '../../common/interfaces/crud.interface';
import TransportTypeModel from '../../models/ProductItem.model';
import { CreateProductItemDto, PatchProductItemDto, PutProductItemDto } from './productItems.dto';

class ProductItemsService implements CRUD {
  async create(ressource: CreateProductItemDto) {
    return TransportTypeModel.addProductItem(ressource);
  }

  async patchById(id: string, ressource: PatchProductItemDto) {
    return TransportTypeModel.updateProductItemById(id, ressource);
  }

  async putById(id: string, ressource: PutProductItemDto) {
    return TransportTypeModel.updateProductItemById(id, ressource);
  }

  async deleteById(id: string) {
    return TransportTypeModel.removeProductItemById(id);
  }

  async list() {
    return TransportTypeModel.getProductItems();
  }

  async readById(id: string) {
    return TransportTypeModel.getProductItemById(id);
  }
}

export default new ProductItemsService();
