import { model, Model, Schema } from "mongoose";
import { Role } from "../../../domain/entities/role";

export const roleSchema = new Schema({
    id: String,
    roleName: String,
});

export const roleModel: Model<Role> = model<Role>("Role", roleSchema);