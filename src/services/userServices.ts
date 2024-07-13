import { NotFoundError } from "../error/NotFoundError";
import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";
import * as UserModel from "../models/user";
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
 * @returns {Promise<object>} - message object
 */
export const createUser = async (user: IUser): Promise<object> => {
  logger.info("Started createUser service");

  if (!(user.name && user.email && user.password)) {
    const message = messageGenerator.invalid("Field");
    logger.error(message);
    throw new NotFoundError(message);
  }

  const existingUser = UserModel.getUserByEmail(user.email);

  if (existingUser) {
    const message = messageGenerator.alreadyExists("User");
    logger.error(message);
    throw new BadRequestError(message);
  }

  if (!user.role) {
    user.role = userRole.USER;
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
 * @returns {IUser[]}
 */
export const getAllUsers = (query: IGetRequestQuery): IUser[] => {
  logger.info("Started getAllUsers service");
  logger.info("Exiting getAllUsers service");
  return UserModel.getAllUsers(query);
};

/**
 * Get a user by email
 *
 * @param {string} email - email of the user
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
export const getUserByEmail = (email: string): IUser | undefined => {
  logger.info("Started getUserByEmail service");
  const data = UserModel.getUserByEmail(email);

  logger.info("Exiting getUserByEmail service");
  return data;
};

/**
 * Get a user by id
 *
 * @param id
 * @returns {IUser | undefined} - user or undefined if doesn't exist
 */
export const getUserById = (id: string): IUser | undefined => {
  logger.info("Started getUserById service");

  const data = UserModel.getUserById(id);
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
 * @returns {IUser} - user
 */
export const updateUser = (id: string, updatedUser: IUser): IUser => {
  logger.info("Started updateUser service");

  const userExists = UserModel.getUserById(id);

  if (!userExists) {
    const message = messageGenerator.notFound("User");
    logger.error(message);
    throw new NotFoundError(message);
  }

  const data = UserModel.updateUser(id, updatedUser);

  logger.info("Exiting updateUser service");
  return data;
};

/**
 * Delete a user by id
 *
 * @param id - user id
 * @returns {IUser} - deleted user
 */
export const deleteUserById = (id: string): IUser => {
  logger.info("started deleteUser service");

  const userExists = UserModel.getUserById(id);
  if (!userExists) {
    const message = messageGenerator.notFound("User");
    logger.info(message);
    throw new NotFoundError(message);
  }

  const data = UserModel.deleteUserById(id);

  logger.info("Exiting deleteUser service");
  return data;
};
