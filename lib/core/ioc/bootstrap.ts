import "reflect-metadata";
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from "inversify";
import { IUserService, UsersService } from "../../user/application/services/users.service";
import { IUserRepository } from "../../user/domain/contracts/users.repository";
import  UsersRepository  from "../../user/data/mongo/repositories/users.repository";
import { IMerchantRepository } from "../../merchant/domain/contracts/merchant.repository";
import { MerchantRepository } from "../../merchant/data/memory/merchant.repository";
import '../../user/presentation/controllers/users.controller';
import '../../merchant/presentation/controllers/merchants.controller';
import '../../user/presentation/controllers/auth.controller';
import MerchantService, { IMerchantService } from "../../merchant/application/services/merchant.service";
import TYPES from "../constants/types";
import * as bodyParser from 'body-parser';
import cors from 'cors';
import IAddUserCommand, { AddUserCommand } from "../../user/application/use-cases/addUser";
import IListUsersCommand, { ListUsersCommand } from "../../user/application/use-cases/listUsers";
import IGetUserCommand, { GetUserCommand } from "../../user/application/use-cases/getUser";
import { DbServer } from "../db/mongo"
import * as express from 'express';
import IUpdateUserCommand, { UpdateUserCommand } from "../../user/application/use-cases/editUser";
import authorizeMiddleware from "../../user/presentation/middlewares/auth.middleware";
import compression from 'compression';
import helmet from 'helmet';
import logger from "../middlewares/logger.middleware";
import IAuthService, { AuthService } from "../../user/application/services/auth.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import { GetAuthTokenCommand, IGetAuthTokenCommand } from "../../user/application/use-cases/getAuthToken";

var container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UsersRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IMerchantRepository>(TYPES.IMerchantRepository).to(MerchantRepository);
container.bind<IUserService>(TYPES.IUserService).to(UsersService);
container.bind<IMerchantService>(TYPES.IMerchantService).to(MerchantService);
container.bind<IAddUserCommand>(TYPES.IAddUserCommand).to(AddUserCommand);
container.bind<IUpdateUserCommand>(TYPES.IUpdateUserCommand).to(UpdateUserCommand);
container.bind<IListUsersCommand>(TYPES.IListUsersCommand).to(ListUsersCommand);
container.bind<IGetAuthTokenCommand>(TYPES.IGetAuthTokenCommand).to(GetAuthTokenCommand);
container.bind<IGetUserCommand>(TYPES.IGetUserCommand).to(GetUserCommand); 

container.bind<express.RequestHandler>('authorizeMiddleware').toConstantValue(authorizeMiddleware);

// let controller = controllerFactory(container);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(errorHandlerMiddleware);
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(logger);
  app.use(compression());
  
  
  
  
  /** 
  app.use(expressWinston.logger({
      transports: [
          new winston.transports.Console()
      ],
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
      )
  }));
  app.use(expressWinston.errorLogger({
      transports: [
          new winston.transports.Console()
      ],
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
      )
  })); */
  
});

new DbServer().init();
const port = 4000;
let serverInstance = server.build();
serverInstance.listen(port);

console.log(`Server started on port ${port}`);

export default container;





