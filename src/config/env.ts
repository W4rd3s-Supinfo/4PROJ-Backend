import dotenv from 'dotenv';
import joi from 'joi';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const envVarsSchema: joi.ObjectSchema = joi
  .object()
  .keys({
    SERVER_PORT: joi.number().positive().required(),
    DB_URI: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    SALT_ROUNDS: joi.number().positive().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown();

const { value: envVars, error: envVarsError } = envVarsSchema
  .validate(process.env);

if (envVarsError) {
  throw new Error(`Config validation error: ${envVarsError.message}`);
}

export default {
  serverPort: envVars.SERVER_PORT,
  databaseUri: envVars.DB_URI,
  databaseUser: envVars.DB_USER,
  databasePassword: envVars.DB_PASSWORD,
  saltRound: envVars.SALT_ROUNDS,
  jwtSecret: envVars.JWT_SECRET,
};
