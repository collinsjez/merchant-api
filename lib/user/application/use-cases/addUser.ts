import { inject, injectable } from "inversify";
import TYPES from "../../../core/constants/types";
import argon2 from 'argon2';
import { IUserService } from "../services/users.service";
import { CreateUserDto } from "../dtos/create.user.dto";
import { User } from "../../domain/entities/user"
import { IUserRepository } from "../../domain/contracts/users.repository";

interface IAddUserCommand extends ICallable {
    
}

export default IAddUserCommand

@injectable()
export class AddUserCommand implements IAddUserCommand {

    user: User;

    constructor( @inject(TYPES.IUserRepository) private userRepository: IUserRepository ) {
        
    }
  
    async execute(createUserDto: CreateUserDto) {

        await this.userRepository.create(createUserDto);
        
    }

} 
