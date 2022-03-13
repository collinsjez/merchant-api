import { model, Model, Schema } from "mongoose";
import { User } from "../../../domain/entities/user";

export const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
      },
    firstName: String,
    lastName: String,
    emailAddress: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
      },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
      },
    password: {
        type: String,
        required: true
      },
    status: Boolean,
    confirmationToken: String,
    confirmed: Boolean,
    confirmSentAt: String,
    confirmedAt: String,
    passwordResetToken: String,
    passwordResetTokenSentAt: String,
    deleted: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const UserModel = model<User & Document>("User", userSchema);

export default UserModel;

const toUser = (userModel: Schema) => {
  userModel == undefined ? { userId: "", emailAddress: "" } : userModel;
}