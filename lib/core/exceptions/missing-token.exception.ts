import BaseHttpException from './base-http.exception';

class MissingAuthTokenException extends BaseHttpException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

export default MissingAuthTokenException;