import BaseHttpException from "./base-http.exception";

class NotFoundException extends BaseHttpException {
    constructor(id: string) {
      super(404, `User with id ${id} was not found`);
    }
  }
  
  export default NotFoundException;