import BaseHttpException from "./base-http.exception";

class NotAuthorizedException extends BaseHttpException {
    constructor(msg: any) {
      super(401, msg);
    }
  }
  
  export default NotAuthorizedException;