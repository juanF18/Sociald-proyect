import { UserModel } from "./user.model";

export class PersonModel{
    id?: string;
    code: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    profilePicPath?: string;
    password:string;
    user: UserModel;
}