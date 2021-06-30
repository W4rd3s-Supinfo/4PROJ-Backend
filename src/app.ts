import debug from 'debug';
import http from 'http';
import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import envVars from './config/env';

import CommonRoutesConfig from './common/route.config';
import UsersRoutes from './api/users/users.routes';
import TransportTypesRoutes from './api/transportTypes/transportTypes.routes';
import FridgesRoutes from './api/fridges/fridges.routes';
import WarehousesRoutes from './api/warehouses/warehouses.routes';
import OrdersRoutes from './api/orders/orders.routes';
import ProductDetailsRoutes from './api/productDetails/productDetails.routes';
import ProductItemsRoutes from './api/productItems/productItems.routes';
import AuthRoutes from './api/auth/auth.routes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());
app.use(helmet());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new TransportTypesRoutes(app));
routes.push(new FridgesRoutes(app));
routes.push(new WarehousesRoutes(app));
routes.push(new OrdersRoutes(app));
routes.push(new ProductDetailsRoutes(app));
routes.push(new ProductItemsRoutes(app));
routes.push(new AuthRoutes(app));

server.listen(envVars.serverPort, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  // eslint-disable-next-line no-console
  console.log(`Server running on ${envVars.serverPort} port`);
});
