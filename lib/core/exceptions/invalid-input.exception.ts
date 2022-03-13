import BaseHttpException from "./base-http.exception";

class InvalidInputFieldException extends BaseHttpException {
    constructor(msg: string) {
      super(401, 'Invalid Input. ' + msg);
    }
  }
  
  export default InvalidInputFieldException;