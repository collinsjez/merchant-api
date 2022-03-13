import BaseHttpException from "./base-http.exception";

class UserWithThatEmailAlreadyExistsException extends BaseHttpException {
    constructor(email: string) {
      super(400, `User with email ${email} already exists`);
    }
  }
  
  export default UserWithThatEmailAlreadyExistsException;