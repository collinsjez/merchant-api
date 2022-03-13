import { inject, injectable } from "inversify";
import TYPES from "../../../core/constants/types";
import { IUserService } from "../services/users.service";
import { UpdateUserDto } from "../dtos/update.user.dto";
import { User } from "../../domain/entities/user"

interface IUpdateUserCommand extends ICallable {
    
}

export default IUpdateUserCommand

@injectable()
export class UpdateUserCommand implements IUpdateUserCommand {

    user: User;

    constructor( @inject(TYPES.IUserService) private userService: IUserService) {
        
    }
  
    async execute(resourceId: string, user: UpdateUserDto) {
        return this.userService.putById(resourceId, this.user);
    };


} 
