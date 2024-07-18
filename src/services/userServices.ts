import { NotFoundError } from "../error/NotFoundError";
import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";
import { UserModel } from "../models/user";
import * as messageGenerator from "../utils/messageGenerator";
import bcrypt from "bcrypt";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";

const logger = loggerWithNameSpace("User Services");

/**
 * Create a new user
 *
 * @param {IUser} user - new user field
 * @returns {Promise<{message:string}>} - message object
 */
export const createUser = async (user: IUser): Promise<{ message: string }> => {
  logger.info("Started createUser service");
  const existingUser = await UserModel.getUserByEmail(user.email);
  console.log(existingUser);
  if (existingUser) {
    const message = messageGenerator.alreadyExists("User");
    logger.error(message);
    throw new BadRequestError(message);
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  UserModel.createUser({ ...user, password: hashedPassword });

  logger.info("Exiting createUser service");
  return {
    message: messageGenerator.created("User"),
  };
};

/**
 * Get all users
 *
 * @returns {Promise<IUser[]>} - promise containing users
 */
export const getAllUsers = async (
  query: IGetRequestQuery
): Promise<IUser[]> => {
  logger.info("Started getAllUsers service");
  logger.info("Exiting getAllUsers service");
  return await UserModel.getUsers(query);
};

/**
 * Get a user by email
 *
 * @param {string} email - email of the user
 * @returns {Promise<IUser | undefined>}- promise with user or undefined if doesn't exist
 */
export const getUserByEmail = async (email: string) => {
  logger.info("Started getUserByEmail service");
  const data = await UserModel.getUserByEmail(email);

  logger.info("Exiting getUserByEmail service");
  return data;
};

/**
 * Get a user by id
 *
 * @param id
 * @returns {Promise<IUser | undefined>} - user or undefined if doesn't exist
 */
export const getUserById = async (id: string): Promise<IUser | undefined> => {
  logger.info("Started getUserById service");

  const data = await UserModel.getUserById(id);

  if (!data) {
    const message = messageGenerator.notFound("User");
    logger.error(message);
    throw new NotFoundError(message);
  }

  logger.info("Exiting getUserById service");
  return data;
};

/**
 *  Update a user by id
 *
 * @param {string} id - id of user
 * @param {IUser} updatedUser - new field of user
 * @returns {Promise<IUser>} - updated user
 */
export const updateUser = async (
  id: string,
  updatedUser: IUser
): Promise<IUser> => {
  logger.info("Started updateUser service");

  const userExists = UserModel.getUserById(id);

  if (!userExists) {
    const message = messageGenerator.notFound("User");
    logger.error(message);
    throw new NotFoundError(message);
  }

  if (updatedUser.password) {
    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
  }

  const data = await UserModel.updateUser(id, updatedUser);

  logger.info("Exiting updateUser service");
  return data;
};

/**
 * Delete a user by id
 *
 * @param id - user id
 */
export const deleteUserById = async (id: string) => {
  logger.info("started deleteUser service");

  const userExists = UserModel.getUserById(id);
  if (!userExists) {
    const message = messageGenerator.notFound("User");
    logger.info(message);
    throw new NotFoundError(message);
  }

  await UserModel.deleteUser(id);

  logger.info("Exiting deleteUser service");
};
