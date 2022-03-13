import { NextFunction, Request, Response } from 'express';
import BaseHttpException from '../exceptions/base-http.exception';
import { CustomError } from '../exceptions/CustomError';
import { IHttpResponse } from '../interfaces/http.response.interface';

export function successHandlerMiddleware(
  http: IHttpResponse, 
  request: Request, 
  response: Response, 
  next: NextFunction) {

    http.code = '00';
    http.message = http.message || 'Request was completed successfully';
 
    response
      .status(200)
      .send(http);

}



export default successHandlerMiddleware;