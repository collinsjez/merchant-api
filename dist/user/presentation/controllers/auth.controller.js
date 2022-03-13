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
const debug_1 = __importDefault(require("debug"));
const inversify_express_utils_1 = require("inversify-express-utils");
const constants_1 = __importDefault(require("../../../core/utils/constants"));
const express = __importStar(require("express"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../core/constants/types"));
const error_handler_middleware_1 = __importDefault(require("../../../core/middlewares/error-handler.middleware"));
const invalid_input_exception_1 = __importDefault(require("../../../core/exceptions/invalid-input.exception"));
const not_found_exception_1 = __importDefault(require("../../../core/exceptions/not-found.exception"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const success_handler_middleware_1 = __importDefault(require("../../../core/middlewares/success-handler.middleware"));
const log = (0, debug_1.default)('app:auth-controller');
let AuthController = class AuthController {
    constructor(getUserCommand, authService, userService) {
        this.getUserCommand = getUserCommand;
        this.authService = authService;
        this.userService = userService;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            log(req.body.emailAddress);
            // Get the supplied login credentials
            let { emailAddress, password } = req.body;
            const respMessage = {
                code: "-1",
                message: "Authentication Failure",
                data: {}
            };
            // Check  for email address and password fields
            if (!emailAddress || !password) {
                next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("Email Address and Password cannot be empty"), req, res, next));
            }
            // Get user details by email address
            const user = yield this.userService.getUserByEmail(emailAddress);
            // If user is exist validate the password
            if (user && user.emailAddress && user.emailAddress != "") {
                // If password is valid generate token.
                if (bcryptjs_1.default.compareSync(password, user.password)) {
                    const tokenData = {
                        _id: user.userId,
                        accessTypes: ['admin'],
                        name: `${user.firstName} ${user.lastName}`
                    };
                    const token = yield this.authService.generateAuthToken(tokenData);
                    next(new success_handler_middleware_1.default({
                        code: "00",
                        message: "Success",
                        data: token
                    }, req, res, next));
                }
                else {
                    next(new error_handler_middleware_1.default(new invalid_input_exception_1.default('Failed to authenticate'), req, res, next));
                }
            }
            else {
                next(new error_handler_middleware_1.default(new not_found_exception_1.default(emailAddress), req, res, next));
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    confirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    recoverPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/confirm'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmation", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/password-recovery'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoverPassword", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/password-reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    (0, inversify_express_utils_1.controller)(constants_1.default.BASE_ROUTE_PATH + '/user'),
    __param(0, (0, inversify_1.inject)(types_1.default.IGetUserCommand)),
    __param(1, (0, inversify_1.inject)(types_1.default.IAuthService)),
    __param(2, (0, inversify_1.inject)(types_1.default.IUserService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthController);
exports.default = AuthController;
