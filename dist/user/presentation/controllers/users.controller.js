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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const constants_1 = __importDefault(require("../../../core/utils/constants"));
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = __importDefault(require("../../../core/constants/types"));
const constants_2 = __importDefault(require("../../../core/utils/constants"));
const shortid_1 = __importDefault(require("shortid"));
const authorize_middleware_1 = require("../../../core/middlewares/authorize.middleware");
const validate_user_middlewate_1 = __importDefault(require("../middlewares/validate-user.middlewate"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_handler_middleware_1 = __importDefault(require("../../../core/middlewares/error-handler.middleware"));
const success_handler_middleware_1 = __importDefault(require("../../../core/middlewares/success-handler.middleware"));
const base_http_exception_1 = __importDefault(require("../../../core/exceptions/base-http.exception"));
const invalid_input_exception_1 = __importDefault(require("../../../core/exceptions/invalid-input.exception"));
const CustomError_1 = require("../../../core/exceptions/CustomError");
const log = (0, debug_1.default)('app:users-controller');
let UsersController = class UsersController {
    constructor(getUserCommand, addUserCommand, listUsersCommand, userService) {
        this.getUserCommand = getUserCommand;
        this.addUserCommand = addUserCommand;
        this.listUsersCommand = listUsersCommand;
        this.userService = userService;
        this.path = constants_1.default.BASE_ROUTE_PATH + constants_1.default.ROUTE_PATH_USERS;
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.params.limit;
            const page = req.params.page;
            const users = yield this.listUsersCommand.execute(limit, page);
            const respMessage = {
                code: "00",
                message: "Record Retrieved Successfully",
                data: users
            };
            console.log(respMessage);
            res
                .status(200)
                .send(respMessage);
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            // const authData = res.getHeader('auth-data');
            // const data = JSON.parse(authData?.toString()!);
            if (userId && userId !== "") {
                const user = yield this.getUserCommand.execute(userId);
                // const user = {};
                console.log(user);
                if (!user || user.emailAddress == "" || user.userId == "" || !user.emailAddress || !user.userId) {
                    return next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("UserId does not exit"), req, res, next));
                }
                else {
                    return next(new success_handler_middleware_1.default({
                        code: "00",
                        message: "Record Retrieved Successfully",
                        data: user
                    }, req, res, next));
                }
            }
            else {
                return next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("User Id was not providedd"), req, res, next));
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.body.password);
                const userId = shortid_1.default.generate();
                //Encrypt user password
                const encryptedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                // Get user information
                const createUserDTO = {
                    id: userId,
                    password: encryptedPassword,
                    email: req.body.emailAddress,
                    phone: req.body.phoneNumber,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    permissionLevel: req.body.roleId
                };
                yield this.addUserCommand.execute(createUserDTO);
                console.log("created ..." + JSON.stringify(createUserDTO));
                next(new success_handler_middleware_1.default({
                    code: "00",
                    message: "Success",
                    data: createUserDTO
                }, req, res, next));
            }
            catch (e) {
                const error = e;
                console.log(`fault - ${error.name} message - ${error.message}`);
                next(new error_handler_middleware_1.default(new base_http_exception_1.default(501, `Error: ${error.name}, Message: ${error.message}`), req, res, next));
            }
        });
    }
    patch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.password) {
                req.body.password = yield argon2_1.default.hash(req.body.password);
            }
            log(yield this.userService.patchById(req.params.userId, req.body));
            res.status(204).send(``);
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = yield bcryptjs_1.default.hash(req.body.password, 10);
                log(yield this.userService.putById(req.params.userId, req.body));
                console.log("created ..." + JSON.stringify(req.body));
                next(new success_handler_middleware_1.default({
                    code: "00",
                    message: "Success",
                    data: req.body
                }, req, res, next));
            }
            catch (e) {
                const error = e;
                console.log(`fault - ${error.name} message - ${error.message}`);
                next(new error_handler_middleware_1.default(new CustomError_1.CustomError(`Error: ${error.name}, Message: ${error.message}`, 501, error.stack), req, res, next));
            }
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield this.userService.deleteById(req.params.userId));
            res.status(204).send(``);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/', (0, authorize_middleware_1.authorize)(['admin'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:id', (0, authorize_middleware_1.authorize)(['admin'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/', validate_user_middlewate_1.default, (0, authorize_middleware_1.authorize)(['admin'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patch", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "put", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
UsersController = __decorate([
    (0, inversify_express_utils_1.controller)(constants_2.default.BASE_ROUTE_PATH + '/users'),
    __param(0, (0, inversify_1.inject)(types_1.default.IGetUserCommand)),
    __param(1, (0, inversify_1.inject)(types_1.default.IAddUserCommand)),
    __param(2, (0, inversify_1.inject)(types_1.default.IListUsersCommand)),
    __param(3, (0, inversify_1.inject)(types_1.default.IUserService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UsersController);
exports.default = UsersController;
