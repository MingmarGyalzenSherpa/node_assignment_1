import { NotFoundError } from "../error/NotFoundError";
import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";
import * as UserModel from "../models/user";
import * as messageGenerator from "../utils/messageGenerator";
import bcrypt from "bcrypt";
import { BadRequestError } from "../error/BadRequestError";

/**
 * Create a new user
 *
 * @param {IUser} user - new user field
 * @returns {Promise<object>} - message object
 */
export const createUser = async (user: IUser): Promise<object> => {
  if (!(user.name && user.email && user.password)) {
    throw new NotFoundError(messageGenerator.invalid("Field"));
  }

  const existingUser = UserModel.getUserByEmail(user.email);

  if (existingUser) {
    throw new BadRequestError(messageGenerator.alreadyExists("User"));
  }

  if (!user.role) {
    user.role = userRole.USER;
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  UserModel.createUser({ ...user, password: hashedPassword });

  return {
    message: messageGenerator.created("User"),
  };
};

/**
 * Get all users
 *
 * @returns {IUser[]}
 */
export const getAllUsers = (): IUser[] => UserModel.getAllUsers();

/**
 * Get a user by email
 *
 * @param {string} email - email of the user
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
export const getUserByEmail = (email: string): IUser | undefined => {
  const data = UserModel.getUserByEmail(email);

  return data;
};

/**
 * Get a user by id
 *
 * @param id
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
export const getUserById = (id: string): IUser | undefined => {
  const data = UserModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(messageGenerator.notFound("User"));
  }
  return data;
};

/**
 *  Update a user by id
 *
 * @param {string} id - id of user
 * @param {IUser} updatedUser - new field of user
 * @returns {IUser} - user
 */
export const updateUser = (id: string, updatedUser: IUser): IUser => {
  const userExists = UserModel.getUserById(id);

  if (!userExists) {
    throw new NotFoundError(messageGenerator.notFound("User"));
  }

  const data = UserModel.updateUser(id, updatedUser);

  return data;
};

/**
 * Delete a user by id
 *
 * @param id - user id
 * @returns {IUser} - deleted user
 */
export const deleteUser = (id: string): IUser => {
  const userExists = UserModel.getUserById(id);
  if (!userExists) {
    throw new NotFoundError(messageGenerator.notFound("User"));
  }

  const data = UserModel.deleteUserById(id);

  return data;
};
