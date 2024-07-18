import { IRolePermissions } from "../interfaces/IRolePermissions";
import { BaseModel } from "./base";

export class RolePermissionsModel extends BaseModel {
  /**
   * Get all permissions by role id
   *
   * @param roleId - role id
   * @returns {Promise<IRolePermissions[]> | undefined} - corresponding permissions
   */
  static getAllPermissionsByRoleId = async (
    roleId: string
  ): Promise<IRolePermissions[]> | undefined => {
    const data = await this.queryBuilder()
      .select("role_permissions.roleId", "permissions.permissionName")
      .table("role_permissions")
      .leftJoin(
        "permissions",
        "role_permissions.permission_id",
        "=",
        "permissions.id"
      )
      .where("role_permissions.role_id", roleId);

    return data;
  };
}
