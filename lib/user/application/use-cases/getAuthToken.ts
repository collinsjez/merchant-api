import { injectable } from "inversify";
import { generateToken } from "../../../core/utils/jwt.utils";

export interface IGetAuthTokenCommand extends ICallable {
}

@injectable()
export class GetAuthTokenCommand implements IGetAuthTokenCommand {
    
    async execute(data: any) {
        console.log(`generating token .... ${data}`)
        const token = await generateToken(data);
        console.log(`generated token ${token}`);
        return token;
    }
}



