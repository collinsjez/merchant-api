"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandlerMiddleware = void 0;
function successHandlerMiddleware(http, request, response, next) {
    http.code = '00';
    http.message = http.message || 'Request was completed successfully';
    response
        .status(200)
        .send(http);
}
exports.successHandlerMiddleware = successHandlerMiddleware;
exports.default = successHandlerMiddleware;
