import { BadRequestError } from "../error/BadRequestError";
import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";
import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";
import { BaseModel } from "./base";
import { table } from "console";

export class UserModel extends BaseModel {
  /**
   *  Create a user
   *
   * @param user
   */
  static createUser = async (user: IUser) => {
    //check if user role is give
    if (!user.role) {
      user.role = userRole.USER;
    }
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    //get the id of the role
    const role_id = (await this.getRoleByName(user.role)).id;

    //insert into user table
    await this.queryBuilder()
      .insert({ ...userToCreate, role_id })
      .table("users");
  };

  /**
   *  Get all users
   *
   * @param filter - filter for getting users
   * @returns
   */
  static getUsers = async (filter: IGetRequestQuery) => {
    const { q } = filter;
    console.log(q);
    const query = this.queryBuilder()
      .table("users")
      .leftJoin("roles", "users.role_id", "=", "roles.id")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "roles.role_name",
        "users.created_at"
      )
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }

    const data = await query;
    return data;
  };

  /**
   * Get a user by id
   *
   * @param id - user id
   * @returns
   */
  static getUserById = async (id: string) => {
    const query = this.queryBuilder()
      .table("users")
      .leftJoin("roles", "users.role_id", "=", "roles.id")
      .select(
        "users.name",
        "users.email",
        "roles.role_name",
        "users.created_at"
      )
      .where("users.id", id)
      .first();

    const data = await query;

    return data;
  };

  /**
   * Get a user by email
   *
   * @param email
   * @returns
   */
  static getUserByEmail = async (email: string) => {
    const query = this.queryBuilder()
      .table("users")
      .leftJoin("roles", "users.role_id", "=", "roles.id")
      .select("users.name", "users.email", "roles.role_name")
      .where({ email })
      .first();

    return await query;
  };

  static updateUser = async (id: string, userDetails: IUser) => {
    //check if role is available and valid
    if (userDetails.role) {
      const role = await this.getRoleById(userDetails.role);
      console.log(role);
      if (!role) {
        console.log("no user");
        return;
      }
    }
    //update user
    await this.queryBuilder().update(userDetails).table("users").where({ id });

    const user = await this.getUserById(id);
    return user;
  };

  static deleteUser = async (id: string) => {
    await this.queryBuilder().table("users").where({ id }).del();
  };

  static getRoleByName = async (name: string) => {
    const role = await this.queryBuilder()
      .select("*")
      .table("roles")
      .where({ role_name: name })
      .first();

    return role;
  };

  static getRoleById = async (id: String) => {
    const role = await this.queryBuilder().select("*").table("roles").first();
    return role;
  };
}

let users: IUser[] = [
  {
    id: "1",
    name: "test",
    email: "test@test.com",
    password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
    role: userRole.SUPER_USER,
  },
  {
    id: "2",
    email: "ming@test.com",
    name: "ming",
    password: "$2b$10$VpERQZT46YsPELr0ZJyLceIyW7zJcf1d1mZf6Os9HC2dtkTiLbd6K",
    role: userRole.USER,
  },
];

/**
 * Create a user
 *
 * @param {IUser} user - details of the user
 */
export const createUser = (user: IUser) => {
  users.push({
    id: `${users.length + 1}`,
    ...user,
  });
};

/**
 * Get all users
 *
 * @returns {IUser[]}
 */
export const getAllUsers = (query: IGetRequestQuery): IUser[] => {
  const { q } = query;
  console.log("inside model");
  if (q) {
    return users.filter((user) => user.name.includes(q));
  }
  return users;
};

/**
 * Get user by email
 *
 * @param {string} email - email of the user
 * @returns {IUser | undefined} user - details of the user
 */
export const getUserByEmail = (email: string): IUser | undefined => {
  const user = users.find(({ email: userEmail }) => userEmail === email);

  return user;
};

/**
 *  Get a user by id
 *
 * @param {string} id - id of the user
 * @returns {IUser | undefined} - user
 */
export const getUserById = (id: string): IUser | undefined => {
  const user = users.find(({ id: userId }) => userId === id);

  return user;
};

/**
 * Delete a user by id
 *
 * @param {string} id
 * @returns {IUser} - deleted user
 */
export const deleteUserById = (id: string): IUser => {
  const user = getUserById(id);
  users = users.filter(({ id: userId }) => userId !== id);

  return user;
};

/**
 * Update a user by id
 *
 * @param id
 * @param updatedUser
 * @returns {IUser} - deleted user
 */
export const updateUser = (id: string, updatedUser: IUser): IUser => {
  let user = users.find(({ id: userId }) => userId === id);

  user = { ...user, ...updatedUser };

  users = [...users.filter(({ id: userId }) => userId !== id), user];

  return user;
};
