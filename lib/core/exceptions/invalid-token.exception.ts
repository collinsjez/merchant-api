import BaseHttpException from "./base-http.exception";

class InvalidAuthTokenException extends BaseHttpException {
    constructor(message: string = 'Invalid authentication token') {
      super(401, message);
    }
  }
  
  export default InvalidAuthTokenException;