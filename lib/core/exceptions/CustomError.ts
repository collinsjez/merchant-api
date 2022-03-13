export class CustomError extends Error {

    statusCode: number;

    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, status: number = 500, additionalInfo: any = {}){
        super(message);
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors = () => {
        
    } 
}