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
exports.UserModel = void 0;
const base_1 = require("./base");
const role_1 = require("./role");
class UserModel extends base_1.BaseModel {
}
exports.UserModel = UserModel;
_a = UserModel;
/**
 *  Create a user
 *
 * @param user
 */
UserModel.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user role is give
    if (!user.roleName) {
        user.roleName = "user" /* userRole.USER */;
    }
    const userToCreate = {
        name: user.name,
        email: user.email,
        password: user.password,
    };
    //get the id of the role
    const role_id = (yield role_1.RoleModel.getRoleByName(user.roleName)).id;
    //insert into user table
    yield _a.queryBuilder()
        .insert(Object.assign(Object.assign({}, userToCreate), { role_id }))
        .table("users");
});
/**
 *  Get all users
 *
 * @param filter - filter for getting users
 * @returns {Promise<IUser[]>} - promise containing users
 */
UserModel.getUsers = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = filter;
    console.log(q);
    const query = _a.queryBuilder()
        .table("users")
        .leftJoin("roles", "users.role_id", "=", "roles.id")
        .select("users.id", "users.name", "users.email", "roles.role_name", "users.created_at")
        .limit(filter.size)
        .offset((filter.page - 1) * filter.size);
    if (q) {
        query.whereLike("name", `%${q}%`);
    }
    const data = yield query;
    return data;
});
/**
 * Get a user by id
 *
 * @param id - user id
 * @returns {Promise<IUser | undefined>} - corresponding user or undefined
 */
UserModel.getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = _a.queryBuilder()
        .table("users")
        .leftJoin("roles", "users.role_id", "=", "roles.id")
        .select("users.name", "users.email", "roles.role_name", "users.created_at")
        .where("users.id", id)
        .first();
    const data = yield query;
    return data;
});
/**
 * Get a user by email
 *
 * @param email - email of the user
 * @returns {Promise<IUser | undefined>}
 */
UserModel.getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = _a.queryBuilder()
        .table("users")
        .leftJoin("roles", "users.role_id", "=", "roles.id")
        .select("users.id", "users.name", "users.email", "users.password", "roles.role_name")
        .where({ email })
        .first();
    const data = yield query;
    return data;
});
/**
 * Update info of user
 *
 * @param id - user id
 * @param userDetails - updated details of user
 * @returns {Promise<IUser | undefined>} - user or undefined if user doesn't exist
 */
UserModel.updateUser = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    //check if role is available and valid
    if (userDetails.roleName) {
        const role = yield role_1.RoleModel.getRoleById(userDetails.roleName);
        if (!role) {
            return;
        }
    }
    //update user
    yield _a.queryBuilder().update(userDetails).table("users").where({ id });
    const user = yield _a.getUserById(id);
    return user;
});
/**
 * Delete a user
 *
 * @param id - id of the user
 */
UserModel.deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.queryBuilder().table("users").where({ id }).del();
});
//# sourceMappingURL=user.js.map