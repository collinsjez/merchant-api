
import * as express from 'express';
import InvalidInputFieldException from '../../../core/exceptions/invalid-input.exception';
import errorHandlerMiddleware from '../../../core/middlewares/error-handler.middleware';
import { IUserService, UsersService } from '../../application/services/users.service'
import { User } from '../../domain/entities/user';
import { IFactory } from '../../../core/interfaces/abstract.factory.interface'
import UserRepositoryMongo from '../../data/mongo/repositories/users.repository';
import { RepositoryFactory } from '../../../core/factories/repository.factory';
import UserWithThatEmailAlreadyExistsException from '../../../core/exceptions/already-exists.exception';


async function validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    const { 
        password, 
        emailAddress, 
        phoneNumber, 
        firstName,
        lastName,
        roleId
    } = req.body;

    //console.log(req.body);

    if(!password) next(new errorHandlerMiddleware(new InvalidInputFieldException("Password was not supplied"),req,res,next));
    if(!emailAddress) next(new errorHandlerMiddleware(new InvalidInputFieldException("Email Address was not supplied"),req,res,next));
    if(!phoneNumber) next(new errorHandlerMiddleware(new InvalidInputFieldException("Phone Number was not supplied"),req,res,next));
    if(!firstName) next(new errorHandlerMiddleware(new InvalidInputFieldException("First Name was not supplied"),req,res,next));
    if(!lastName) next(new errorHandlerMiddleware(new InvalidInputFieldException("Last Name was not supplied"),req,res,next));
    

    // check if user already exist
    // Validate if user exist in our database
    const user = await getUser(new RepositoryFactory(), emailAddress);
    
    if (user.emailAddress == emailAddress) {
        next(new errorHandlerMiddleware(new UserWithThatEmailAlreadyExistsException(emailAddress),req,res,next));
    } else {
        next();
        // res.status(404).send({error: `User ${req.params.userId} not found`});
    }

    
}

async function getUser(factory: IFactory, emailAddress: string) : Promise<User> {
    const userRepository: UserRepositoryMongo = factory.createUserRepository("Mongo");
    return await userRepository.getByEmail(emailAddress)
}


export default validateUser