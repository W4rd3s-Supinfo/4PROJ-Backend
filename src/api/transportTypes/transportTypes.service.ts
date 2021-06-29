import CRUD from '../../common/interfaces/crud.interface';
import TransportTypeModel from '../../models/TransportType.model';
import { CreateTransportTypeDto, PatchTransportTypeDto, PutTransportTypeDto } from './transportTypes.dto';

class TransportTypesService implements CRUD {
  async create(ressource: CreateTransportTypeDto) {
    return TransportTypeModel.addTransportType(ressource);
  }

  async patchById(id: string, ressource: PatchTransportTypeDto) {
    return TransportTypeModel.updateTransportTypeById(id, ressource);
  }

  async putById(id: string, ressource: PutTransportTypeDto) {
    return TransportTypeModel.updateTransportTypeById(id, ressource);
  }

  async deleteById(id: string) {
    return TransportTypeModel.removeTransportTypeById(id);
  }

  async list() {
    return TransportTypeModel.getTransportTypes();
  }

  async readById(id: string) {
    return TransportTypeModel.getTransportTypeById(id);
  }
}

export default new TransportTypesService();
