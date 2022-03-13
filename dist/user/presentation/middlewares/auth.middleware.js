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
const jwt = __importStar(require("jsonwebtoken"));
const missing_token_exception_1 = __importDefault(require("../../../core/exceptions/missing-token.exception"));
const invalid_token_exception_1 = __importDefault(require("../../../core/exceptions/invalid-token.exception"));
const users_repository_1 = __importDefault(require("../../data/mongo/repositories/users.repository"));
const error_handler_middleware_1 = __importDefault(require("../../../core/middlewares/error-handler.middleware"));
function authorizeMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = request.headers.authorization;
        const cookies = request.cookies;
        const userRepo = new users_repository_1.default();
        if (authorization) {
            const secret = process.env.JWT_SECRET;
            try {
                const verificationResponse = jwt.verify(authorization, secret);
                const id = verificationResponse._id;
                const userModel = yield userRepo.readById(id, {});
                if (userModel) {
                    //request.user = userModel;
                    next();
                }
                else {
                    next(new error_handler_middleware_1.default(new missing_token_exception_1.default(), request, response, next));
                }
            }
            catch (error) {
                next(new error_handler_middleware_1.default(new invalid_token_exception_1.default(), request, response, next));
            }
        }
        else {
            next(new missing_token_exception_1.default());
        }
    });
}
exports.default = authorizeMiddleware;
