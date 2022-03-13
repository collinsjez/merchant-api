import { inject, injectable } from "inversify";
import TYPES from "../../../core/constants/types";
import TokenPayload from "../../../core/interfaces/token-payload";
import { generateToken } from "../../../core/utils/jwt.utils";
import { IGetAuthTokenCommand } from "../use-cases/getAuthToken"

export interface IAuthService {
    login: (email: string, password: string) => Promise<any>;
    verifyAuthToken: (token: string) => Promise<any>;
    revokeAuthToken: (token: string) => Promise<any>;
    generateAuthToken: (payload: TokenPayload) => Promise<string>;
}

@injectable()
export class AuthService implements IAuthService {

    constructor(@inject(TYPES.IGetAuthTokenCommand) private getAuthTokenCommand: IGetAuthTokenCommand) {

    }

    login: (email: string, password: string) => Promise<any>;
    verifyAuthToken: (token: string) => Promise<any>;
    revokeAuthToken: (token: string) => Promise<any>;
   

    async generateAuthToken(payload: TokenPayload) {
       
        return await this.getAuthTokenCommand.execute(payload);
    };

}

export default IAuthService

