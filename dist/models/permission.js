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
exports.PermissionModel = void 0;
const base_1 = require("./base");
class PermissionModel extends base_1.BaseModel {
}
exports.PermissionModel = PermissionModel;
_a = PermissionModel;
/**
 * Get a permission by name
 *
 * @param permissionName - name of permission
 * @returns {Promise<IPermission | undefined>} - permission data or undefined
 */
PermissionModel.getPermissionByName = (permissionName) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _a.queryBuilder()
        .select("*")
        .table("permissions")
        .where({ permission_name: permissionName })
        .first();
    return data;
});
/**
 * Get a permission by id
 *
 * @param id - id of permission
 * @returns {Promise<IPermission | undefined>} - permission data or undefined
 */
PermissionModel.getPermissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _a.queryBuilder()
        .select("*")
        .table("permissions")
        .where({ id })
        .first();
    return data;
});
//# sourceMappingURL=permission.js.map