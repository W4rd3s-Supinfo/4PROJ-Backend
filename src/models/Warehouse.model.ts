import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateWarehouseDto, PatchWarehouseDto, PutWarehouseDto } from '../api/warehouses/warehouses.dto';

const log: debug.IDebugger = debug('app:Warehouse-model');

class WarehouseModel {
  Mongoose = mongooseService.getMongoose();

  Schema = this.Mongoose.Schema;

  warehouseSchema = new this.Schema({
    name: String,
    ownerId: String,
    maxCapacity: Number,
    gpsCord: String,
    productList: [
      {
        productId: { type: this.Mongoose.Types.ObjectId, ref: 'ProductItems' },
        quantity: Number,
      },
    ],
  }, {
    timestamps: true,
  })

  Warehouse = mongooseService.getMongoose().model('Warehouses', this.warehouseSchema);

  constructor() {
    log('Created new instance of WarehouseModel');
  }

  async addWarehouse(warehouseFields: CreateWarehouseDto) {
    const warehouse = new this.Warehouse({
      ...warehouseFields,
    });
    await warehouse.save();
    return warehouse._id;
  }

  async updateWarehouseById(_id: string, warehouseFields: PatchWarehouseDto | PutWarehouseDto) {
    return this.Warehouse.findOneAndUpdate(
      { _id },
      { $set: warehouseFields },
      { new: true },
    ).exec();
  }

  async removeWarehouseById(_id: string) {
    return this.Warehouse.deleteOne({ _id }).exec();
  }

  async getWarehouses() {
    return this.Warehouse.find().exec();
  }

  async getWarehouseById(_id: string) {
    return this.Warehouse.findOne({ _id }).exec();
  }

  async getWarehouseByOwner(ownerId: string, populate: boolean) {
    if (populate) {
      return this.Warehouse.find({ ownerId }).populate({
        path: 'productList',
        populate: {
          path: 'productId',
          populate: {
            path: 'detailId',
          },
        },
      }).exec();
    }
    return this.Warehouse.find({ ownerId }).exec();
  }

  async addProduct(ownerId: string, productId: string, stock: string) {
    this.Warehouse.updateOne({ ownerId }, { productList: { $push: { productId } } }).exec();
  }

  async updateProductStock(ownerId: string, productId: string) {
    this.Warehouse.updateMany({ ownerId }, { productList: { $pull: { productId } } }).exec();
  }

  async removeProduct(ownerId: string, productId: string) {
    this.Warehouse.updateMany({ ownerId }, { productList: { $pull: { productId } } }).exec();
  }
}

export default new WarehouseModel();
