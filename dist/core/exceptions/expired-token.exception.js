"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_http_exception_1 = __importDefault(require("./base-http.exception"));
class ExpiredAuthTokenException extends base_http_exception_1.default {
    constructor() {
        super(401, 'Expired authentication token');
    }
}
exports.default = ExpiredAuthTokenException;
