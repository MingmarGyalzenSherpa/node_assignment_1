import { BadRequestError } from "../error/BadRequestError";
import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";
import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";
import { BaseModel } from "./base";
import { RoleModel } from "./role";

export class UserModel extends BaseModel {
  /**
   *  Create a user
   *
   * @param user
   */
  static createUser = async (user: IUser) => {
    //check if user role is give
    if (!user.roleName) {
      user.roleName = userRole.USER;
    }

    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    //get the id of the role
    const role_id = (await RoleModel.getRoleByName(user.roleName)).id;

    //insert into user table
    await this.queryBuilder()
      .insert({ ...userToCreate, role_id })
      .table("users");
  };

  /**
   *  Get all users
   *
   * @param filter - filter for getting users
   * @returns {Promise<IUser[]>} - promise containing users
   */
  static getUsers = async (filter: IGetRequestQuery): Promise<IUser[]> => {
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
    return data as IUser[];
  };

  /**
   * Get a user by id
   *
   * @param id - user id
   * @returns {Promise<IUser | undefined>} - corresponding user or undefined
   */
  static getUserById = async (id: string): Promise<IUser | undefined> => {
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
   * @param email - email of the user
   * @returns {Promise<IUser | undefined>}
   */
  static getUserByEmail = async (email: string): Promise<IUser | undefined> => {
    const query = this.queryBuilder()
      .table("users")
      .leftJoin("roles", "users.role_id", "=", "roles.id")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "roles.role_name"
      )
      .where({ email })
      .first();

    const data: IUser = await query;
    return data;
  };

  /**
   * Update info of user
   *
   * @param id - user id
   * @param userDetails - updated details of user
   * @returns {Promise<IUser | undefined>} - user or undefined if user doesn't exist
   */
  static updateUser = async (
    id: string,
    userDetails: IUser
  ): Promise<IUser | undefined> => {
    //check if role is available and valid
    if (userDetails.roleName) {
      const role = await RoleModel.getRoleById(userDetails.roleName);

      if (!role) {
        return;
      }
    }
    //update user
    await this.queryBuilder().update(userDetails).table("users").where({ id });

    const user = await this.getUserById(id);
    return user;
  };

  /**
   * Delete a user
   *
   * @param id - id of the user
   */
  static deleteUser = async (id: string) => {
    await this.queryBuilder().table("users").where({ id }).del();
  };
}
