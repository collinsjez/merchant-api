import { IFactory } from "../interfaces/abstract.factory.interface";
import UsersRepository from "../../user/data/memory/user.repository";
import UserRepositoryMongo from "../../user/data/mongo/repositories/users.repository";

export class RepositoryFactory implements IFactory {

    createUserRepositoryMongo(): UserRepositoryMongo {
        return new UserRepositoryMongo();
    }

    createUserRepositoryMemory(): UsersRepository {
        return new UsersRepository();
    }

    createUserRepository(type: string = "Mongo"): any {

        switch(type) {
            case "Mongo":
                return this.createUserRepositoryMongo();
            case "Memory" :
                return this.createUserRepositoryMemory();
        }

    }

}