import IUser from "../interfaces/IUser";
import * as UserModel from "../models/user";

import bcrypt from "bcrypt";

export const createUser = async (user: IUser) => {
  if (!(user.name && user.email && user.password)) {
    return {
      message: "Email or password missing",
    };
  }

  const existingUser = UserModel.getUserByEmail(user.email);

  if (existingUser) {
    return {
      message: "User already exists!",
    };
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const data = UserModel.createUser({ ...user, password: hashedPassword });

  return data;
};

export const getUserByEmail = (email: string) => {
  const data = UserModel.getUserByEmail(email);

  return data;
};
