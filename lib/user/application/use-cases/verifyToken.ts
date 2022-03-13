import { injectable } from "inversify";

export default interface IVerifyTokenCommand extends ICallable {
    
}

@injectable()
class VerifyToken implements IVerifyTokenCommand {
    execute: () => Promise<any>;  
}

export { VerifyToken }