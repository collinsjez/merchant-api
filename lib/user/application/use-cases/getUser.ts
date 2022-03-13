import { inject, injectable } from "inversify";
import TYPES from "../../../core/constants/types";
import { IUserRepository } from "../../domain/contracts/users.repository";

@injectable()
class GetUserCommand implements IGetUserCommand {

    constructor(  @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}
  
    async execute(id: string) {
        return await this.userRepository.readById(id, {});;
    }
    
}

export { GetUserCommand }


export interface IGetUserCommand extends ICallable {
    
}

export default IGetUserCommand

