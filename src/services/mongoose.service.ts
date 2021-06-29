import mongoose from 'mongoose';
import debug from 'debug';
import envVars from '../config/env';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;

  private mongoose = mongoose;

  private mongooseOptions: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
    user: envVars.databaseUser,
    pass: envVars.databasePassword,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return this.mongoose;
  }

  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)');
    this.mongoose
      .connect(envVars.databaseUri, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `MongoDB connection unsuccessful (will retry #${this.count += 1} after ${retrySeconds} seconds):`,
          err,
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}
export default new MongooseService();
