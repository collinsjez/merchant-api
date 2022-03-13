import { Role } from "../../domain/entities/role";

export interface CreateUserDto {
  id: string;
  email: string;
  phone?: string;
  password: string;
  firstName?: string;
  lastName?: string; 
  permissionLevel?: number;
  role?: Role;
}