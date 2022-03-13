import BaseHttpException from "./base-http.exception";

class ExpiredAuthTokenException extends BaseHttpException {
    constructor() {
      super(401, 'Expired authentication token');
    }
  }
  
  export default ExpiredAuthTokenException;