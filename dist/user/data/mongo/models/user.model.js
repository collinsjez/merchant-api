"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
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
const UserModel = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = UserModel;
const toUser = (userModel) => {
    userModel == undefined ? { userId: "", emailAddress: "" } : userModel;
};
