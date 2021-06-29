import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateTransportTypeDto, PatchTransportTypeDto, PutTransportTypeDto } from '../api/transportTypes/transportTypes.dto';

const log: debug.IDebugger = debug('app:TransportType-model');

class TransportTypeModel {
  Schema = mongooseService.getMongoose().Schema

  transportTypeSchema = new this.Schema({
    name: String,
    carbon: Number,
    price: Number,
  }, {
    timestamps: true,
  })

  TransportType = mongooseService.getMongoose().model('TransportTypes', this.transportTypeSchema);

  constructor() {
    log('Created new instance of TransportTypeModel');
  }

  async addTransportType(transportTypeFields: CreateTransportTypeDto) {
    const transportType = new this.TransportType({
      ...transportTypeFields,
    });
    await transportType.save();
    return transportType._id;
  }

  async updateTransportTypeById(
    _id: string,
    transportTypeFields: PatchTransportTypeDto | PutTransportTypeDto,
  ) {
    return this.TransportType.findOneAndUpdate(
      { _id },
      { $set: transportTypeFields },
      { new: true },
    ).exec();
  }

  async removeTransportTypeById(_id: string) {
    return this.TransportType.deleteOne({ _id }).exec();
  }

  async getTransportTypes() {
    return this.TransportType.find().exec();
  }

  async getTransportTypeById(_id: string) {
    return this.TransportType.findOne({ _id }).exec();
  }
}

export default new TransportTypeModel();
