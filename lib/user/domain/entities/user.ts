import { Role } from "./role";


export interface User {

    userId: string;
    firstName?: string;
    lastName?: string;
    emailAddress: string;
    phoneNumber?: string;
    password?: string;
    role?: Role;
    status?: boolean;
    confirmationToken?: string;
    confirmed?: false;
    confirmSentAt?: string;
    confirmedAt?: string;
    passwordResetToken?: string;
    passwordResetTokenSentAt?: string;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
   
  } 
  