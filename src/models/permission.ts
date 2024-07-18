import { IPermission } from "../interfaces/IPermission";
import { BaseModel } from "./base";

export class PermissionModel extends BaseModel {
  /**
   * Get a permission by name
   *
   * @param permissionName - name of permission
   * @returns {Promise<IPermission | undefined>} - permission data or undefined
   */
  static getPermissionByName = async (
    permissionName: string
  ): Promise<IPermission | undefined> => {
    const data = await this.queryBuilder()
      .select("*")
      .table("permissions")
      .where({ permission_name: permissionName })
      .first();

    return data;
  };

  /**
   * Get a permission by id
   *
   * @param id - id of permission
   * @returns {Promise<IPermission | undefined>} - permission data or undefined
   */
  static getPermissionById = async (id: string) => {
    const data = await this.queryBuilder()
      .select("*")
      .table("permissions")
      .where({ id })
      .first();
    return data;
  };
}
