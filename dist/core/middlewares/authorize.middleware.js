"use strict";
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
exports.authorize = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const invalid_token_exception_1 = __importDefault(require("../exceptions/invalid-token.exception"));
const not_authorized_exception_1 = __importDefault(require("../exceptions/not-authorized.exception"));
const base_http_exception_1 = __importDefault(require("../exceptions/base-http.exception"));
/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
const authorize = (allowedAccessTypes) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwt = req.headers.authorization;
        // verify request has token
        if (jwt) {
            // remove Bearer if using Bearer Authorization mechanism
            if (jwt.toLowerCase().startsWith('bearer')) {
                jwt = jwt.slice('bearer'.length).trim();
            }
            // verify token hasn't expired yet
            const decodedToken = yield (0, jwt_utils_1.validateToken)(jwt);
            const hasAccessToEndpoint = allowedAccessTypes.some((at) => decodedToken.data.accessTypes.some((uat) => uat === at));
            if (!hasAccessToEndpoint) {
                return next(new error_handler_middleware_1.default(new not_authorized_exception_1.default("You do not enough privileges to access endpoint"), req, res, next));
            }
            else {
                res.setHeader("auth-data", JSON.stringify(decodedToken.data));
                next();
            }
        }
        else
            throw new invalid_token_exception_1.default();
        //return next(new errorHandlerMiddleware(,req,res,next));
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new error_handler_middleware_1.default(new invalid_token_exception_1.default(), req, res, next));
        }
        else
            return next(new error_handler_middleware_1.default(new base_http_exception_1.default(500, "Authentication Failure - " + error.message), req, res, next));
    }
});
exports.authorize = authorize;
