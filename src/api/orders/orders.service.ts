import CRUD from '../../common/interfaces/crud.interface';
import TransportTypeModel from '../../models/Order.model';
import { CreateOrderDto, PatchOrderDto, PutOrderDto } from './orders.dto';

class OrdersService implements CRUD {
  async create(ressource: CreateOrderDto) {
    return TransportTypeModel.addOrder(ressource);
  }

  async patchById(id: string, ressource: PatchOrderDto) {
    return TransportTypeModel.updateOrderById(id, ressource);
  }

  async putById(id: string, ressource: PutOrderDto) {
    return TransportTypeModel.updateOrderById(id, ressource);
  }

  async deleteById(id: string) {
    return TransportTypeModel.removeOrderById(id);
  }

  async list() {
    return TransportTypeModel.getOrders();
  }

  async readById(id: string) {
    return TransportTypeModel.getOrderById(id);
  }

  async readByUser(id: string) {
    return TransportTypeModel.getOrderByUser(id);
  }

  async readByStatus(statusCode: number) {
    return TransportTypeModel.getOrderByStatus(statusCode);
  }
}

export default new OrdersService();
