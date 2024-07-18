"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsModel = void 0;
const base_1 = require("./base");
class RolePermissionsModel extends base_1.BaseModel {
}
exports.RolePermissionsModel = RolePermissionsModel;
_a = RolePermissionsModel;
/**
 * Get all permissions by role id
 *
 * @param roleId - role id
 * @returns {Promise<IRolePermissions[]> | undefined} - corresponding permissions
 */
RolePermissionsModel.getAllPermissionsByRoleId = (roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _a.queryBuilder()
        .select("role_permissions.roleId", "permissions.permissionName")
        .table("role_permissions")
        .leftJoin("permissions", "role_permissions.permission_id", "=", "permissions.id")
        .where("role_permissions.role_id", roleId);
    return data;
});
//# sourceMappingURL=rolePermission.js.map