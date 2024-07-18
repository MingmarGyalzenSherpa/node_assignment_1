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
exports.RoleModel = void 0;
const base_1 = require("./base");
class RoleModel extends base_1.BaseModel {
}
exports.RoleModel = RoleModel;
_a = RoleModel;
/**
 *Get a role by id

 * @param id - id of role
 * @returns {Promise<IRole>} - corresponding role
 */
RoleModel.getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _a.queryBuilder()
        .select("*")
        .table("roles")
        .where({ id })
        .first();
    return data;
});
/**
 *Get a role by name

 * @param name - name of role
 * @returns {Promise<IRole>} - corresponding role
 */
RoleModel.getRoleByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _a.queryBuilder()
        .select("*")
        .table("roles")
        .where({ role_name: name })
        .first();
    return data;
});
//# sourceMappingURL=role.js.map