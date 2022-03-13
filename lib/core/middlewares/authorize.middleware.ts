import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.utils';
import errorHandlerMiddleware from './error-handler.middleware';
import InvalidTokenException from '../exceptions/invalid-token.exception';
import NotAuthorizedException from '../exceptions/not-authorized.exception';
import ExpiredAuthTokenException from '../exceptions/expired-token.exception';
import BaseHttpException from '../exceptions/base-http.exception';
import successHandlerMiddleware from './success-handler.middleware';
import authSuccessMiddleware from './auth-success.middleware';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  
try {
    
    let jwt = req.headers.authorization;
    
    // verify request has token
    if (jwt) {
     
      // remove Bearer if using Bearer Authorization mechanism
      if (jwt.toLowerCase().startsWith('bearer')) {
        jwt = jwt.slice('bearer'.length).trim();
      }
     
      // verify token hasn't expired yet
      const decodedToken = await validateToken(jwt);

      const hasAccessToEndpoint = allowedAccessTypes.some(
        (at) => decodedToken.data.accessTypes!.some((uat: any) => uat === at)
      );

      if (!hasAccessToEndpoint) {
        
       return next(new errorHandlerMiddleware(
          new NotAuthorizedException("You do not enough privileges to access endpoint"),
          req,res,next));
        
      } else {

        res.setHeader("auth-data", JSON.stringify(decodedToken.data)) ;
        next();
      }

      

    }
    else

    throw new InvalidTokenException();
   //return next(new errorHandlerMiddleware(,req,res,next));
    

  } catch (error: any) {

    if (error.name === 'JsonWebTokenError') {
      next(new errorHandlerMiddleware(new InvalidTokenException(),req,res,next));
    }else 
    return next(new errorHandlerMiddleware(new BaseHttpException(500,"Authentication Failure - " + error.message),req,res,next));
    
  }

  
};