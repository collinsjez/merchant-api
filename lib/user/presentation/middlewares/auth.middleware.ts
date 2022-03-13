import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthTokenMissingException from '../../../core/exceptions/missing-token.exception';
import InvalidTokenException from '../../../core/exceptions/invalid-token.exception';
import DataStoredInToken from '../../../core/interfaces/token-payload';
import UserRequest from '../../presentation/requests/user-request.interface';
import UserRepositoryMongo  from '../../data/mongo/repositories/users.repository'
import errorHandlerMiddleware from '../../../core/middlewares/error-handler.middleware';


async function authorizeMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const authorization = request.headers.authorization;
  const cookies = request.cookies;
  const userRepo = new UserRepositoryMongo(); 
  
  if (authorization) {

    const secret = process.env.JWT_SECRET!;

    try {

      const verificationResponse = jwt.verify(authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      
      const userModel = await userRepo.readById(id, {});
      
      if (userModel) {
        //request.user = userModel;
        next();
      } else {
        next(new errorHandlerMiddleware(new AuthTokenMissingException(),request,response,next));
      }

    } catch (error) {
      next(new errorHandlerMiddleware(new InvalidTokenException(),request,response,next));
    }

  } else {
    next(new AuthTokenMissingException());
  }
}

export default authorizeMiddleware;