"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpException = void 0;
class BaseHttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.BaseHttpException = BaseHttpException;
exports.default = BaseHttpException;
