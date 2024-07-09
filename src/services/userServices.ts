import IUser from "../interfaces/IUser";
import * as UserModel from "../models/user";

import bcrypt from "bcrypt";

export const createUser = async (user: IUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 100);
  const data = UserModel.createUser({ ...user, password: hashedPassword });
  console.log("here");
  return data;
};
