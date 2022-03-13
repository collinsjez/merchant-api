"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const getProcessingTimeInMS = (time) => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
};
function loggerMiddleware(request, response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
}
exports.loggerMiddleware = loggerMiddleware;
/**
 * add logs for an API endpoint using the following pattern
 *  [id][timestamp] method:url START processing
 *  [id][timestamp] method:url response.statusCode END processing
 *
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
function logger(req, res, next) {
    console.log(`Method: ${req.method}, Url: ${req.baseUrl}, endpoint: ${req.path},  Ip: ${req.ip}, Payload: ${JSON.stringify(req.body)}`);
    // execute next middleware/event handler
    next();
}
;
exports.default = logger;
