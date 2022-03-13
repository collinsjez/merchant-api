
import { inject, injectable } from "inversify";
import { IService } from "../../../core/interfaces/app.service.interface";
import TYPES from "../../../core/constants/types";
import { IMerchantRepository } from "../../domain/contracts/merchant.repository"

@injectable()
class MerchantService implements IMerchantService  {

    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<any>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    patchById: (id: string, resource: any) => Promise<any>;

    constructor(@inject(TYPES.IMerchantRepository) private merchantRepository: IMerchantRepository){
       
    }

    async list(limit: number, page: number) {
       
       this.merchantRepository.listMerchants(limit, page);
    }
    
}

export default MerchantService;

export interface IMerchantService extends IService{
   
}