"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSuccessMiddleware = void 0;
function authSuccessMiddleware(data, request, response, next) {
    //http.code = '00';
    // http.message = http.message || 'Request was completed successfully';
    /**response
      .status(200)
      .send(http);**/
    response.setHeader("auth-data", JSON.stringify(data));
    next();
}
exports.authSuccessMiddleware = authSuccessMiddleware;
exports.default = authSuccessMiddleware;
