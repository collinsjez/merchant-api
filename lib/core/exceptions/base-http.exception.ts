export class BaseHttpException extends Error {

    public status: number;
    public message: string;

    constructor(status: number, message: string) {
      
      super(message);

      this.status = status;
      this.message = message;

    }
  }
  
  export default BaseHttpException;