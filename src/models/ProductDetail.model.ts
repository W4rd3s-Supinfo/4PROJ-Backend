import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateProductDetailDto, PatchProductDetailDto, PutProductDetailDto } from '../api/productDetails/productDetails.dto';

const log: debug.IDebugger = debug('app:ProductDetail-model');

class ProductDetailModel {
  Schema = mongooseService.getMongoose().Schema

  productDetailSchema = new this.Schema({
    name: String,
    baseCarbon: Number,
    producerId: String,
    producerPrice: Number,
    composition: String,
  }, {
    timestamps: true,
  })

  ProductDetail = mongooseService.getMongoose().model('ProductDetails', this.productDetailSchema);

  constructor() {
    log('Created new instance of ProductDetailModel');
  }

  async addProductDetail(productDetailFields: CreateProductDetailDto) {
    const productDetail = new this.ProductDetail({
      ...productDetailFields,
    });
    await productDetail.save();
    return productDetail._id;
  }

  async updateProductDetailById(
    _id: string,
    productDetailFields: PatchProductDetailDto | PutProductDetailDto,
  ) {
    return this.ProductDetail.findOneAndUpdate(
      { _id },
      { $set: productDetailFields },
      { new: true },
    ).exec();
  }

  async removeProductDetailById(_id: string) {
    return this.ProductDetail.deleteOne({ _id }).exec();
  }

  async getProductDetails() {
    return this.ProductDetail.find().exec();
  }

  async getProductDetailById(_id: string) {
    return this.ProductDetail.findOne({ _id }).exec();
  }

  async getProductDetailByProducer(producerId: string) {
    return this.ProductDetail.find({ producerId }).exec();
  }
}

export default new ProductDetailModel();
