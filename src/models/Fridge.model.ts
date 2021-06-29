import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import { CreateFridgeDto, PatchFridgeDto, PutFridgeDto } from '../api/fridges/fridges.dto';

const log: debug.IDebugger = debug('app:Fridge-model');

class FridgeModel {
  Schema = mongooseService.getMongoose().Schema

  fridgeSchema = new this.Schema({
    name: String,
    ownerId: String,
    productList: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  }, {
    timestamps: true,
  })

  Fridge = mongooseService.getMongoose().model('Fridges', this.fridgeSchema);

  constructor() {
    log('Created new instance of FridgeModel');
  }

  async addFridge(fridgeFields: CreateFridgeDto) {
    const fridge = new this.Fridge({
      ...fridgeFields,
    });
    await fridge.save();
    return fridge._id;
  }

  async updateFridgeById(_id: string, fridgeFields: PatchFridgeDto | PutFridgeDto) {
    return this.Fridge.findOneAndUpdate(
      { _id },
      { $set: fridgeFields },
      { new: true },
    ).exec();
  }

  async removeFridgeById(_id: string) {
    return this.Fridge.deleteOne({ _id }).exec();
  }

  async getFridges() {
    return this.Fridge.find().exec();
  }

  async getFridgeById(_id: string) {
    return this.Fridge.findOne({ _id }).exec();
  }

  async getFridgeByOwner(ownerId: string) {
    return this.Fridge.find({ ownerId }).exec();
  }
}

export default new FridgeModel();
