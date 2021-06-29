import CRUD from '../../common/interfaces/crud.interface';
import WarehouseModel from '../../models/Warehouse.model';
import { CreateWarehouseDto, PatchWarehouseDto, PutWarehouseDto } from './warehouses.dto';

class WarehousesService implements CRUD {
  async create(ressource: CreateWarehouseDto) {
    return WarehouseModel.addWarehouse(ressource);
  }

  async patchById(id: string, ressource: PatchWarehouseDto) {
    return WarehouseModel.updateWarehouseById(id, ressource);
  }

  async putById(id: string, ressource: PutWarehouseDto) {
    return WarehouseModel.updateWarehouseById(id, ressource);
  }

  async deleteById(id: string) {
    return WarehouseModel.removeWarehouseById(id);
  }

  async list() {
    return WarehouseModel.getWarehouses();
  }

  async readById(id: string) {
    return WarehouseModel.getWarehouseById(id);
  }

  async readByOwner(id: string) {
    return WarehouseModel.getWarehouseByOwner(id);
  }
}

export default new WarehousesService();
