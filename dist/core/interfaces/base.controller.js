"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = __importDefault(require("express"));
class BaseController {
    constructor() {
        this.router = express_1.default.Router();
    }
}
exports.BaseController = BaseController;
