import debug from 'debug';
import mongooseService from '../services/mongoose.service';
import permissionFlag from '../common/middleware/permission/permissionFlag.enum';
import { CreateUserDto, PatchUserDto, PutUserDto } from '../api/users/users.dto';

const log: debug.IDebugger = debug('app:user-model');

class UserModel {
  Schema = mongooseService.getMongoose().Schema

  userSchema = new this.Schema({
    fullName: String,
    email: String,
    password: { type: String, select: false },
    phone: String,
    address: String,
    zipCode: String,
    city: String,
    permissionFlag: { type: Number, enum: permissionFlag, default: 1 },
  }, {
    timestamps: true,
  })

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UserModel');
  }

  async addUser(userFields: CreateUserDto) {
    const user = new this.User({
      ...userFields,
    });
    await user.save();
    return user._id;
  }

  async updateUserById(_id: string, userFields: PatchUserDto | PutUserDto) {
    return this.User.findOneAndUpdate(
      { _id },
      { $set: userFields },
      { new: true },
    ).exec();
  }

  async removeUserById(_id: string) {
    return this.User.deleteOne({ _id }).exec();
  }

  async getUsers() {
    return this.User.find().exec();
  }

  async getUserById(_id: string) {
    return this.User.findOne({ _id }).exec();
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email }).exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email })
      .select('_id email permissionFlag password')
      .exec();
  }
}

export default new UserModel();
