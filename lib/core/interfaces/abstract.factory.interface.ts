import UsersRepository from "../../user/data/memory/user.repository";
import UserRepositoryMongo from "../../user/data/mongo/repositories/users.repository";

export interface IFactory {

    createUserRepository(type: string): any
}