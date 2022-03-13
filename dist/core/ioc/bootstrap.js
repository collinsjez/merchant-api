"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const users_service_1 = require("../../user/application/services/users.service");
const users_repository_1 = __importDefault(require("../../user/data/mongo/repositories/users.repository"));
const merchant_repository_1 = require("../../merchant/data/memory/merchant.repository");
require("../../user/presentation/controllers/users.controller");
require("../../merchant/presentation/controllers/merchants.controller");
require("../../user/presentation/controllers/auth.controller");
const merchant_service_1 = __importDefault(require("../../merchant/application/services/merchant.service"));
const types_1 = __importDefault(require("../constants/types"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const addUser_1 = require("../../user/application/use-cases/addUser");
const listUsers_1 = require("../../user/application/use-cases/listUsers");
const getUser_1 = require("../../user/application/use-cases/getUser");
const mongo_1 = require("../db/mongo");
const editUser_1 = require("../../user/application/use-cases/editUser");
const auth_middleware_1 = __importDefault(require("../../user/presentation/middlewares/auth.middleware"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const logger_middleware_1 = __importDefault(require("../middlewares/logger.middleware"));
const auth_service_1 = require("../../user/application/services/auth.service");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const getAuthToken_1 = require("../../user/application/use-cases/getAuthToken");
var container = new inversify_1.Container();
container.bind(types_1.default.IUserRepository).to(users_repository_1.default);
container.bind(types_1.default.IAuthService).to(auth_service_1.AuthService);
container.bind(types_1.default.IMerchantRepository).to(merchant_repository_1.MerchantRepository);
container.bind(types_1.default.IUserService).to(users_service_1.UsersService);
container.bind(types_1.default.IMerchantService).to(merchant_service_1.default);
container.bind(types_1.default.IAddUserCommand).to(addUser_1.AddUserCommand);
container.bind(types_1.default.IUpdateUserCommand).to(editUser_1.UpdateUserCommand);
container.bind(types_1.default.IListUsersCommand).to(listUsers_1.ListUsersCommand);
container.bind(types_1.default.IGetAuthTokenCommand).to(getAuthToken_1.GetAuthTokenCommand);
container.bind(types_1.default.IGetUserCommand).to(getUser_1.GetUserCommand);
container.bind('authorizeMiddleware').toConstantValue(auth_middleware_1.default);
// let controller = controllerFactory(container);
// start the server
let server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(error_handler_middleware_1.default);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(logger_middleware_1.default);
    app.use((0, compression_1.default)());
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
new mongo_1.DbServer().init();
const port = 4000;
let serverInstance = server.build();
serverInstance.listen(port);
console.log(`Server started on port ${port}`);
exports.default = container;
