import { inject, injectable } from "inversify";
import TYPES from "../../../core/constants/types";
import { IUserRepository } from "../../domain/contracts/users.repository";
import { IUserService } from "../services/users.service";

export interface IListUsersCommand extends ICallable {
    
}

export default IListUsersCommand

@injectable()
class ListUsersCommand implements IListUsersCommand {

    constructor(  @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

    async execute(_limit: number, _page: number) {
        
        return this.userRepository.list(_limit, _page);
    }
    
}

export { ListUsersCommand }