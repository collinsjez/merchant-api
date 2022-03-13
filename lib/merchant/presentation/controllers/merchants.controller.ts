import express from 'express';
import { BaseController } from '../../../core/interfaces/base.controller';
import { IMerchantService }  from '../../application/services/merchant.service';
import Contants from '../../../core/utils/constants'

import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '../../../core/constants/types';

@controller('/merchants')
//@injectable()
class MerchantsController {

    public path = Contants.BASE_ROUTE_PATH + Contants.ROUTE_PATH_MERCHANTS;
   
    initializeRoutes(): void {
        // this.router.get(this.path, this.listMerchants);
        // console.log('initialized '+ this.path);
    }

    constructor(@inject(TYPES.IMerchantService) private merchantService: IMerchantService) {
        //super();
        this.initializeRoutes();
    }

    @httpGet('/')
    async listMerchants(request: express.Request, response: express.Response) {
        const merchants = await this.merchantService.list(100,0);
        response.status(200).send(merchants);
    }
}

export default MerchantsController;