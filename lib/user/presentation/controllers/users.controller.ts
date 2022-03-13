
import * as express from 'express';
import argon2 from 'argon2';
import debug from 'debug';
import Contants from '../../../core/utils/constants'
import { Container, inject } from 'inversify';

import { IUserService } from '../../application/services/users.service';
import { controller, httpGet, httpPost, httpPut, httpDelete, httpPatch } from 'inversify-express-utils';
import TYPES from '../../../core/constants/types';
import Constants from '../../../core/utils/constants';
import IAddUserCommand from '../../application/use-cases/addUser';
import IListUsersCommand from '../../application/use-cases/listUsers';
import IGetUserCommand from '../../application/use-cases/getUser';
import { CreateUserDto } from '../../application/dtos/create.user.dto';
import shortid from 'shortid';
import { IHttpResponse } from '../../../core/interfaces/http.response.interface';
import UserRequest from '../requests/user-request.interface';
import NotAuthorizedException from '../../../core/exceptions/not-authorized.exception';
import { authorize } from '../../../core/middlewares/authorize.middleware';
import validateUser from '../middlewares/validate-user.middlewate';
import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import errorHandlerMiddleware from '../../../core/middlewares/error-handler.middleware';
import successHandlerMiddleware from '../../../core/middlewares/success-handler.middleware';
import BaseHttpException from '../../../core/exceptions/base-http.exception';
import InvalidInputFieldException from '../../../core/exceptions/invalid-input.exception';
import { CustomError } from '../../../core/exceptions/CustomError';

const log: debug.IDebugger = debug('app:users-controller');


@controller(Constants.BASE_ROUTE_PATH+'/users')
class UsersController {
 
 
    public path = Contants.BASE_ROUTE_PATH + Contants.ROUTE_PATH_USERS;
    
   
    constructor(
        @inject(TYPES.IGetUserCommand) private getUserCommand: IGetUserCommand,
        @inject(TYPES.IAddUserCommand) private addUserCommand: IAddUserCommand,
        @inject(TYPES.IListUsersCommand) private listUsersCommand: IListUsersCommand,
        @inject(TYPES.IUserService) private userService: IUserService,
        ) {
      
    }

    @httpGet('/',authorize(['admin']))
    async listUsers(req: express.Request, res: express.Response) {

        const limit = req.params.limit;
        const page = req.params.page;

        const users = await this.listUsersCommand.execute(limit, page);

        const respMessage: IHttpResponse = {
            code: "00",
            message: "Record Retrieved Successfully",
            data: users
        };

       console.log(respMessage);

       res
      .status(200)
      .send(respMessage);
        
    }

    @httpGet('/:id', authorize(['admin']))
    async getUserById(req: express.Request, res: express.Response, next: NextFunction) {

        const userId: string = req.params.id;
        // const authData = res.getHeader('auth-data');
        // const data = JSON.parse(authData?.toString()!);

        if (userId && userId !== "") {

            const user = await this.getUserCommand.execute(userId);
            
            // const user = {};

            console.log(user);

            if(!user || user.emailAddress == "" || user.userId == "" || !user.emailAddress || !user.userId) {
                return next(new errorHandlerMiddleware(
                    new InvalidInputFieldException("UserId does not exit"),
                    req,res,next));
            }
            else {
                return next(new successHandlerMiddleware({
                    code: "00",
                    message: "Record Retrieved Successfully",
                    data: user
                },req,res,next));
            }

            
            
        }
        else {
           
            return next(new errorHandlerMiddleware(
                new InvalidInputFieldException("User Id was not providedd"),
                req,res,next));
        
        }

        
        
    } 

   @httpPost('/',
   validateUser, 
   authorize(['admin']))
    async createUser(req: express.Request, res: express.Response, next: NextFunction) {

       try {

            // console.log(req.body.password);

            const userId = shortid.generate();
            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);

            // Get user information
            const createUserDTO: CreateUserDto = {
                id: userId,
                password: encryptedPassword,
                email: req.body.emailAddress,
                phone: req.body.phoneNumber,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                permissionLevel: req.body.roleId
            }

            await this.addUserCommand.execute(createUserDTO);

            console.log("created ..." + JSON.stringify(createUserDTO));

            next(new successHandlerMiddleware({
                code: "00",
                message: "Success",
                data: createUserDTO
            },req,res,next));

        }
        catch(e: any){

            const error = (e as Error);
            console.log(`fault - ${error.name} message - ${error.message}`);
            
            next(new errorHandlerMiddleware(
               new BaseHttpException(501, `Error: ${error.name}, Message: ${error.message}`),
                req,res,next));
           
        }

    } 

    @httpPatch('/:id')
    async patch(req: express.Request, res: express.Response, next: NextFunction) {
        if(req.body.password){
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await this.userService.patchById(req.params.userId, req.body));
        res.status(204).send(``);
    }

   @httpPut('/:id')
    async put(req: express.Request, res: express.Response, next: NextFunction) {

        try {
            
            req.body.password = await bcrypt.hash(req.body.password,10);
            log(await this.userService.putById(req.params.userId, req.body));

            console.log("created ..." + JSON.stringify(req.body));

            next(new successHandlerMiddleware({
                code: "00",
                message: "Success",
                data: req.body
            },req,res,next));
           
        }
        catch(e) {

            const error = (e as Error);
            console.log(`fault - ${error.name} message - ${error.message}`);
            
            next(new errorHandlerMiddleware(
               new CustomError(`Error: ${error.name}, Message: ${error.message}`,501, error.stack),
                req,res,next));
        }

        
    }

   @httpDelete('/:id')
    async removeUser(req: express.Request, res: express.Response) {
        log(await this.userService.deleteById(req.params.userId));
        res.status(204).send(``);
    }

    
}

export default UsersController;


