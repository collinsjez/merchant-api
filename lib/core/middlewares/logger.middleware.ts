import { Request, Response, NextFunction } from 'express';

const getProcessingTimeInMS = (time: [number, number]): string => {
  return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(`${request.method} ${request.path}`);
  next();
}

/**
 * add logs for an API endpoint using the following pattern
 *  [id][timestamp] method:url START processing
 *  [id][timestamp] method:url response.statusCode END processing
 *
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 */
 function logger(req: Request, res: Response, next: NextFunction) {

  console.log(`Method: ${req.method}, Url: ${req.baseUrl}, endpoint: ${req.path},  Ip: ${req.ip}, Payload: ${JSON.stringify(req.body)}`);

  
  // execute next middleware/event handler
  next();
};


export default logger;