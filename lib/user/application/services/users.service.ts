import { inject, injectable } from "inversify";
import { IService } from "../../../core/interfaces/app.service.interface";
import TYPES from "../../../core/constants/types";
import { IUserRepository } from "../../domain/contracts/users.repository";
import { User } from "../../domain/entities/user";
import { CreateUserDto } from "../dtos/create.user.dto";

@injectable()
class UsersService implements IUserService {

    private userRepository: IUserRepository

    constructor(
        @inject(TYPES.IUserRepository) userRepository: IUserRepository 
        ) {
        this.userRepository = userRepository;
    }
   

    async getUserByEmail(email: string) {
        return await this.userRepository.getByEmail(email)
    };
   
    async patchById(resourceId: string,resource: User) {
        return this.userRepository.patchById(resourceId, resource)
    };

    async create(resource: CreateUserDto) {
        return this.userRepository.create(resource);
    }

    async deleteById(resourceId: string) {
        return this.userRepository.deleteById(resourceId);
    };

    async list(limit: number, page: number) {
        return this.userRepository.list(limit, page);
    };

   

    async readById(resourceId: string) {
        return this.userRepository.readById(resourceId, {});
    };

    async putById(resourceId: string, resource: User) {
        return this.userRepository.putById(resourceId, resource);
    };

   /** async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }*/ 
}

export { UsersService };

export interface IUserService extends IService{
    getUserByEmail: (email: string) => Promise<any>;
}