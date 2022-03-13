import { IRepository } from "../../../core/interfaces/repository.interface";

export interface IMerchantRepository extends IRepository {

    listMerchants: (limit: number, page: number) => Promise<any>;

}

