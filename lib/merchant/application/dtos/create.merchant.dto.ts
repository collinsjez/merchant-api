
export interface CreateMerchantDto {
    name: string;
    type?: string;
    category?: string;
    sector?: string;
    sub_sector?: string;
    postal_address: string;
    business_email?: string;
    business_phone?: string;
    suport_email?: string;
    support_phone?: string;
    website?: string;
    accounts: any;
    reg_no?: string;
    documents?: any;
    contacts: any;
    options?: any;
    status: string;
    stores: any;
    
  } 