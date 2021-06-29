import bcrypt from 'bcrypt';
import envVars from '../../config/env';
import CRUD from '../../common/interfaces/crud.interface';
import UserModel from '../../models/User.model';
import { CreateUserDto, PatchUserDto, PutUserDto } from './users.dto';

class UsersService implements CRUD {
  async create(ressource: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(ressource.password, envVars.saltRound);
    return UserModel.addUser({ ...ressource, password: hashedPassword });
  }

  async patchById(id: string, ressource: PatchUserDto) {
    if (ressource.password) {
      const hashedPassword = await bcrypt.hash(ressource.password, envVars.saltRound);
      return UserModel.updateUserById(id, { ...ressource, password: hashedPassword });
    }
    return UserModel.updateUserById(id, ressource);
  }

  async putById(id: string, ressource: PutUserDto) {
    const hashedPassword = await bcrypt.hash(ressource.password, envVars.saltRound);
    return UserModel.updateUserById(id, { ...ressource, password: hashedPassword });
  }

  async deleteById(id: string) {
    return UserModel.removeUserById(id);
  }

  async list() {
    return UserModel.getUsers();
  }

  async readById(id: string) {
    return UserModel.getUserById(id);
  }

  async getUserByEmailWithPassword(email: string) {
    return UserModel.getUserByEmailWithPassword(email);
  }

  async getUserByEmail(email: string) {
    return UserModel.getUserByEmail(email);
  }
}

export default new UsersService();
