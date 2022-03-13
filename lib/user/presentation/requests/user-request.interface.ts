import { User } from "../../domain/entities/user";
import { Request } from 'express';
interface UserRequest extends Request {
    user: User;
  }
  
  export default UserRequest;