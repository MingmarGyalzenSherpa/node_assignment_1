import IUser from "../interfaces/IUser";
import * as UserModel from "../models/user";

import bcrypt from "bcrypt";

/**
 * Create a new user
 * @param {IUser} user - new user field
 * @returns {Promise<object>} - message object
 */
export const createUser = async (user: IUser): Promise<object> => {
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
  UserModel.createUser({ ...user, password: hashedPassword });

  return {
    message: "User created successfully",
  };
};

/**
 * Get a user by email
 * @param {string} email - email of the user
 * @returns {IUser} - user
 */
export const getUserByEmail = (email: string): IUser => {
  const data = UserModel.getUserByEmail(email);
  return data;
};
