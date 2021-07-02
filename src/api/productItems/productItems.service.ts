import CRUD from '../../common/interfaces/crud.interface';
import ProductItemModel from '../../models/ProductItem.model';
import { CreateProductItemDto, PatchProductItemDto, PutProductItemDto } from './productItems.dto';

class ProductItemsService implements CRUD {
  async create(ressource: CreateProductItemDto) {
    return ProductItemModel.addProductItem(ressource);
  }

  async patchById(id: string, ressource: PatchProductItemDto) {
    return ProductItemModel.updateProductItemById(id, ressource);
  }

  async putById(id: string, ressource: PutProductItemDto) {
    return ProductItemModel.updateProductItemById(id, ressource);
  }

  async deleteById(id: string) {
    return ProductItemModel.removeProductItemById(id);
  }

  async list() {
    return ProductItemModel.getProductItems();
  }

  async readById(id: string) {
    return ProductItemModel.getProductItemById(id);
  }

  async countByDetailId(detailId: string) {
    return ProductItemModel.countByProductDetailId(detailId);
  }

  async removeByDetailId(detailId: string, count: number) {
    return ProductItemModel.removeByProductDetailId(detailId, count);
  }
}

export default new ProductItemsService();
