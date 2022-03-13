"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_http_exception_1 = __importDefault(require("./base-http.exception"));
class UserWithThatEmailAlreadyExistsException extends base_http_exception_1.default {
    constructor(email) {
        super(400, `User with email ${email} already exists`);
    }
}
exports.default = UserWithThatEmailAlreadyExistsException;
