export class UserModel {
  id?: string;
  username: string;
  password?: string;
  personId?: string;
  role?: string;
  token?: string;
  isLogged: Boolean = false;
}
