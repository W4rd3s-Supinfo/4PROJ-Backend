import CRUD from '../../common/interfaces/crud.interface';
import TransportTypeModel from '../../models/Fridge.model';
import { CreateFridgeDto, PatchFridgeDto, PutFridgeDto } from './fridges.dto';

class FridgesService implements CRUD {
  async create(ressource: CreateFridgeDto) {
    return TransportTypeModel.addFridge(ressource);
  }

  async patchById(id: string, ressource: PatchFridgeDto) {
    return TransportTypeModel.updateFridgeById(id, ressource);
  }

  async putById(id: string, ressource: PutFridgeDto) {
    return TransportTypeModel.updateFridgeById(id, ressource);
  }

  async deleteById(id: string) {
    return TransportTypeModel.removeFridgeById(id);
  }

  async list() {
    return TransportTypeModel.getFridges();
  }

  async readById(id: string) {
    return TransportTypeModel.getFridgeById(id);
  }

  async readByOwner(id: string) {
    return TransportTypeModel.getFridgeByOwner(id);
  }
}

export default new FridgesService();
