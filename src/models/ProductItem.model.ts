import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateProductItemDto, PatchProductItemDto, PutProductItemDto } from '../api/productItems/productItems.dto';

const log: debug.IDebugger = debug('app:ProductItem-model');

class ProductItemModel {
  Mongoose = mongooseService.getMongoose();

  Schema = this.Mongoose.Schema;

  productItemSchema = new this.Schema({
    destroyed: { type: Boolean, default: false },
    totalCarbon: Number,
    expirationDate: Date,
    marketPrice: Number,
    detailId: { type: this.Mongoose.Types.ObjectId, ref: 'ProductDetails' },
  }, {
    timestamps: true,
  })

  ProductItem = mongooseService.getMongoose().model('ProductItems', this.productItemSchema);

  constructor() {
    log('Created new instance of ProductItemModel');
  }

  async addProductItem(productItemFields: CreateProductItemDto) {
    const productItem = new this.ProductItem({
      ...productItemFields,
    });
    await productItem.save();
    return productItem._id;
  }

  async updateProductItemById(
    _id: string,
    productItemFields: PatchProductItemDto | PutProductItemDto,
  ) {
    return this.ProductItem.findOneAndUpdate(
      { _id },
      { $set: productItemFields },
      { new: true },
    ).exec();
  }

  async removeProductItemById(_id: string) {
    return this.ProductItem.deleteOne({ _id }).exec();
  }

  async getProductItems() {
    return this.ProductItem.find().exec();
  }

  async getProductItemById(_id: string) {
    return this.ProductItem.findOne({ _id }).exec();
  }
}

export default new ProductItemModel();
