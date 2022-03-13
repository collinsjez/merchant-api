import { IRepository } from "../../../core/interfaces/repository.interface";

export interface IUserRepository extends IRepository {
    getByEmail: (email: string) => Promise<any>;
}
