import { User } from '../model/user.model';
import UserModel from '../model/user.model';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}
