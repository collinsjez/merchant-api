import { Bank } from "./Bank";
import { Contact } from "./Contact";
import { Store } from "./Store";

export interface Merchant {

    id: string;
    businessName: string;
    businessType?: string;
    businessCategory?: string;
    sector?: string;
    subSector?: string;
    postalAddress: string;
    businessEmail?: string;
    businessPhone?: string;
    suportEmail?: string;
    supportPhone?: string;
    website?: string;
    bankAccounts: Bank[];
    registraionNumber?: string;
    businessDocuments?: any;
    businessContacts: Contact[];
    serviceOptions?: any;
    status: string;
    businessLocations: Store[];
    
  } 
  