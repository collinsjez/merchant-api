import { NextFunction, Request, Response } from 'express';
import BaseHttpException from '../exceptions/base-http.exception';
import { CustomError } from '../exceptions/CustomError';
import { IHttpResponse } from '../interfaces/http.response.interface';

export function errorHandlerMiddleware(
  error: BaseHttpException, 
  request: Request, 
  response: Response, 
  next: NextFunction) {

    const responseStatus = error.status || 500;
    const responseMessage = error.message || 'Something went wrong';

    const resp: IHttpResponse = {
      "code": "-1",
      "message": "An error has occured",
      "data": {
        responseMessage,
        responseStatus,
      }
    }

    response.status(responseStatus).send(resp);

}

const errorHandler = ()=>{

}


/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
 export function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrasing. We are having troubles my friend'
    );
  }

  // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError as CustomError).status).send(customError);
};

export default errorHandlerMiddleware;