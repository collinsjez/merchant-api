
import { injectable } from "inversify";
import { IMerchantRepository } from "../../domain/contracts/merchant.repository"

@injectable()
export class MerchantRepository implements IMerchantRepository {

    listMerchants: (limit: number, page: number) => Promise<any>;
    
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<any>;
    readById: (id: string, resource: any) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    patchById: (id: string, resource: any) => Promise<any>;

}