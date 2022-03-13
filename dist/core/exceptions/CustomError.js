"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status = 500, additionalInfo = {}) {
        super(message);
        this.serializeErrors = () => {
        };
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
