"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.errorHandlerMiddleware = void 0;
const CustomError_1 = require("../exceptions/CustomError");
function errorHandlerMiddleware(error, request, response, next) {
    const responseStatus = error.status || 500;
    const responseMessage = error.message || 'Something went wrong';
    const resp = {
        "code": "-1",
        "message": "An error has occured",
        "data": {
            responseMessage,
            responseStatus,
        }
    };
    response.status(responseStatus).send(resp);
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const errorHandler = () => {
};
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(err, req, res, next) {
    let customError = err;
    if (!(err instanceof CustomError_1.CustomError)) {
        customError = new CustomError_1.CustomError('Oh no, this is embarrasing. We are having troubles my friend');
    }
    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status(customError.status).send(customError);
}
exports.handleError = handleError;
;
exports.default = errorHandlerMiddleware;
