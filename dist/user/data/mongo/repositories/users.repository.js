"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const user_model_1 = __importDefault(require("../../mongo/models/user.model"));
let UserRepositoryMongo = class UserRepositoryMongo {
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield user_model_1.default.findOne({ emailAddress: email });
            return userModel == undefined ? { userId: "", emailAddress: "" } : userModel;
        });
    }
    putById(id, _user) {
        return __awaiter(this, void 0, void 0, function* () {
            // let user = (_user as User);
            // const existingUser =  await UserModel.findOne({ userId: id });
            /**if(existingUser){
    
                console.log("updating user record... " + JSON.stringify(user));
    
                existingUser.emailAddress = user.emailAddress;
                existingUser.phoneNumber = user.phoneNumber;
                existingUser.firstName = user.firstName,
                existingUser.lastName = user.lastName;
                existingUser.role = user.role;
                existingUser.status = user.status;
                existingUser.deleted = user.deleted;
                existingUser.confirmed = user.confirmed;
                existingUser.confirmSentAt = user.confirmSentAt;
                existingUser.confirmationToken =  user.confirmationToken;
                existingUser.confirmedAt = user.confirmSentAt;
                existingUser.passwordResetToken = user.passwordResetToken;
                existingUser.passwordResetTokenSentAt =  user.passwordResetTokenSentAt;
                existingUser.updatedAt = new Date();
    
                return await UserModel.updateOne(user) == undefined ? {userId:"", emailAddress:""} : user ;
    
            }
            else {
                console.log("User does not exist ");
                
            }**/
            let user = _user;
            yield user_model_1.default.findOneAndUpdate({ userId: id }, user);
            return { userId: "", emailAddress: "" };
            //;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    readById(id, resource = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieving user record... " + id);
            //const userModel = UserModel.find({ userId: id });
            const userModel = yield user_model_1.default.findOne({ userId: id });
            return userModel == undefined ? { userId: "", emailAddress: "" } : userModel;
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieving user records... ");
            return user_model_1.default.find();
            ;
        });
    }
    create(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating user record... " + JSON.stringify(userDTO));
            let user = {
                userId: userDTO.id,
                emailAddress: userDTO.email,
                password: userDTO.password,
                phoneNumber: userDTO.phone,
                firstName: userDTO.firstName,
                lastName: userDTO.lastName,
                role: { roleId: userDTO.permissionLevel },
                status: false,
                deleted: false,
                confirmed: false,
                confirmSentAt: "na",
                confirmationToken: "na",
                confirmedAt: "na",
                passwordResetToken: "na",
                passwordResetTokenSentAt: "na",
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const userNew = yield user_model_1.default.create(user);
            console.log(userNew);
            return userNew;
        });
    }
};
UserRepositoryMongo = __decorate([
    (0, inversify_1.injectable)()
], UserRepositoryMongo);
exports.default = UserRepositoryMongo;
