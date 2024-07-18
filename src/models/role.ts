import { IRole } from "../interfaces/IRole";
import { BaseModel } from "./base";

export class RoleModel extends BaseModel {
  /**
   *Get a role by id

   * @param id - id of role
   * @returns {Promise<IRole>} - corresponding role
   */
  static getRoleById = async (id: string): Promise<IRole> => {
    const data = await this.queryBuilder()
      .select("*")
      .table("roles")
      .where({ id })
      .first();

    return data as IRole;
  };

  /**
   *Get a role by name

   * @param name - name of role
   * @returns {Promise<IRole>} - corresponding role
   */
  static getRoleByName = async (name: string) => {
    const data = await this.queryBuilder()
      .select("*")
      .table("roles")

      .where({ role_name: name })
      .first();

    return data as IRole;
  };
}
