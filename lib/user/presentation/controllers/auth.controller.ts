import debug from "debug";
import { controller, httpPost } from "inversify-express-utils";
import Constants from "../../../core/utils/constants";
import * as express from 'express';
import { Container, inject } from "inversify";
import TYPES from "../../../core/constants/types";
import IGetUserCommand from "../../application/use-cases/getUser";
import { User } from "../../domain/entities/user";
import argon2 from 'argon2';
import errorHandlerMiddleware from "../../../core/middlewares/error-handler.middleware";
import InvalidInputFieldException from "../../../core/exceptions/invalid-input.exception";
import IAuthService from "../../application/services/auth.service";
import { IHttpResponse } from "../../../core/interfaces/http.response.interface";
import { IUserService } from "../../application/services/users.service";
import NotFoundException from "../../../core/exceptions/not-found.exception";
import bcrypt from 'bcryptjs';
import TokenPayload from "../../../core/interfaces/token-payload";
import successHandlerMiddleware from "../../../core/middlewares/success-handler.middleware";


const log: debug.IDebugger = debug('app:auth-controller');


@controller(Constants.BASE_ROUTE_PATH+'/user')
class AuthController {

    constructor(
        @inject(TYPES.IGetUserCommand) private getUserCommand: IGetUserCommand,
        @inject(TYPES.IAuthService) private authService: IAuthService,
        @inject(TYPES.IUserService) private userService: IUserService,
    ){}

    @httpPost('/login')
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {

        log(req.body.emailAddress);
        // Get the supplied login credentials
        let { emailAddress, password } = req.body;

        const respMessage: IHttpResponse = {
            code: "-1",
            message: "Authentication Failure",
            data: {}
        };
       
        // Check  for email address and password fields
        if (!emailAddress || !password) {
            next(new errorHandlerMiddleware(
                new InvalidInputFieldException("Email Address and Password cannot be empty"),req,res,next));
        }

        // Get user details by email address
        const user: User = await this.userService.getUserByEmail(emailAddress);
        
        // If user is exist validate the password
        if(user && user.emailAddress && user.emailAddress != "") {

           // If password is valid generate token.
            if(bcrypt.compareSync(password,user.password!))
            { 
                const tokenData: TokenPayload = {
                    _id: user.userId,
                    accessTypes: ['admin'],
                    name: `${user.firstName} ${user.lastName}`

                }

                const token = await this.authService.generateAuthToken(tokenData);
               
                next(new successHandlerMiddleware({
                    code: "00",
                    message: "Success",
                    data: token
                },req,res,next));

                
            }
            else
            { 
                next(new errorHandlerMiddleware(new InvalidInputFieldException('Failed to authenticate'),req,res,next)); 
            }

            
        }
        else {
            next(new errorHandlerMiddleware(new NotFoundException(emailAddress),req,res,next));
        }



    }

    @httpPost('/logout')
    async logout(req: express.Request, res: express.Response) {

        
    }

    @httpPost('/confirm')
    async confirmation(req: express.Request, res: express.Response) {

    }

    @httpPost('/password-recovery')
    async recoverPassword(req: express.Request, res: express.Response) {

    }

    @httpPost('/password-reset')
    async resetPassword(req: express.Request, res: express.Response) {

    }


 
}



export default AuthController