import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateOrderDto, PatchOrderDto, PutOrderDto } from '../api/orders/orders.dto';

const log: debug.IDebugger = debug('app:Order-model');

class OrderModel {
  Schema = mongooseService.getMongoose().Schema

  orderSchema = new this.Schema({
    clientId: String,
    supplierId: String,
    transportTypeId: String,
    statusCode: Number,
    orderDetail: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  }, {
    timestamps: true,
  })

  Order = mongooseService.getMongoose().model('Orders', this.orderSchema);

  constructor() {
    log('Created new instance of OrderModel');
  }

  async addOrder(orderFields: CreateOrderDto) {
    const order = new this.Order({
      ...orderFields,
    });
    await order.save();
    return order._id;
  }

  async updateOrderById(_id: string, orderFields: PatchOrderDto | PutOrderDto) {
    return this.Order.findOneAndUpdate(
      { _id },
      { $set: orderFields },
      { new: true },
    ).exec();
  }

  async removeOrderById(_id: string) {
    return this.Order.deleteOne({ _id }).exec();
  }

  async getOrders() {
    return this.Order.find().exec();
  }

  async getOrderById(_id: string) {
    return this.Order.findOne({ _id }).exec();
  }

  async getOrderByUser(userId: string) {
    return this.Order.find({ $or: [{ clientId: userId }, { supplierId: userId }] }).exec();
  }

  async getOrderByStatus(statusCode: number) {
    return this.Order.find({ statusCode }).exec();
  }
}

export default new OrderModel();
