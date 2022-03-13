
import shortid from "shortid";
import debug from 'debug';
import { IUserRepository } from "../../domain/contracts/users.repository";
import { User } from "../../domain/entities/user";
import { injectable } from "inversify";
import { CreateUserDto } from "../../application/dtos/create.user.dto";

const log: debug.IDebugger = debug('app:in-memory-dao');

@injectable()
class UsersRepository implements IUserRepository {

    users: Array<User> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    async getByEmail(email: string) {
        return this.users;
    };

    async list(limit: number, page: number) {
        return this.users;
    };
   

    async create(userDTO: CreateUserDto) {

        const user: User = {
            userId : shortid.generate(),
            emailAddress: userDTO.email,
            password: userDTO.password,
            phoneNumber: userDTO.phone,
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            role: {roleId: userDTO.permissionLevel!}
        }
        
        this.users.push(user);
        return user.userId;
    }

    async getUsers() {
        return this.users;
    }

    async readById(userId: string, resource: any) {
        return this.users.find((user: { userId: string; }) => user.userId === userId);
    }

    async putById(userId: string, user: User) {
        const objIndex = this.users.findIndex((obj: { userId: string; }) => obj.userId === user.userId);
        this.users.splice(objIndex, 1, user);
        return `${user.userId} updated via put`;
    }

    async patchById(userId: string, user: User) {
        const objIndex = this.users.findIndex((obj: { userId: string; }) => obj.userId === user.userId);
        let currentUser = this.users[objIndex];
        const allowedPatchFields = ["password", "firstName", "lastName", "permissionLevel"];
        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                currentUser[field] = user[field];
            }
        }
        this.users.splice(objIndex, 1, currentUser);
        return `${user.userId} patched`;
    }


    async deleteById(userId: string) {
        const objIndex = this.users.findIndex((obj: { userId: string; }) => obj.userId === userId);
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex((obj: { emailAddress: string; }) => obj.emailAddress === email);
        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default UsersRepository;