export class UserModel {
  id?: string;
  email?: string;
  password?: string;
  role?: string;
  personId?: string;
  token?: string;
  isLogged: Boolean = false;
}
