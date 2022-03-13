import { IUserRepository } from "../../../domain/contracts/users.repository";
import { injectable } from 'inversify';
import { User } from "../../../domain/entities/user";
import shortid from "shortid";
import { CreateUserDto } from "../../../application/dtos/create.user.dto";
import UserModel from  "../../mongo/models/user.model";

@injectable()
class UserRepositoryMongo implements IUserRepository {
  
    async getByEmail(email: string) {
        const userModel = await UserModel.findOne({ emailAddress: email });
        return userModel == undefined ? {userId: "", emailAddress: ""} : userModel;
    }
    
    async putById(id: string, _user: any) : Promise<User>  {

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

        let user = (_user as User);

       
        await UserModel.findOneAndUpdate({userId:id},user);
        

        
        return {userId:"", emailAddress:""};
        //;
    }
    
    async deleteById(id: string) {

    }

    async patchById (id: string, resource: any) {

    }

    async readById(id: string, resource: any = {}) {

        console.log("retrieving user record... " + id );

        //const userModel = UserModel.find({ userId: id });
        const userModel = await UserModel.findOne({ userId: id });

        return userModel == undefined ? {userId: "", emailAddress: ""} : userModel;

    }

    async list(limit: number, page: number) {

        console.log("retrieving user records... " );

        return UserModel.find();;

    }


    async create(userDTO: CreateUserDto) {

        console.log("creating user record... " + JSON.stringify(userDTO));

        let user: User = {
            userId : userDTO.id,
            emailAddress: userDTO.email,
            password: userDTO.password,
            phoneNumber: userDTO.phone,
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            role: {roleId: userDTO.permissionLevel!},
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
        }

        const userNew: User = await UserModel.create(user);

        console.log(userNew);

        return userNew;
    }
  
}

export default UserRepositoryMongo;