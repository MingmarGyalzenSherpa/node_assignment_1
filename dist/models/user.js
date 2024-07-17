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
exports.updateUser = exports.deleteUserById = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = exports.createUser = exports.UserModel = void 0;
const base_1 = require("./base");
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
    if (!user.role) {
        user.role = "user" /* userRole.USER */;
    }
    const userToCreate = {
        name: user.name,
        email: user.email,
        password: user.password,
    };
    //get the id of the role
    const role_id = (yield _a.getRoleByName(user.role)).id;
    //insert into user table
    yield _a.queryBuilder()
        .insert(Object.assign(Object.assign({}, userToCreate), { role_id }))
        .table("users");
});
/**
 *  Get all users
 *
 * @param filter - filter for getting users
 * @returns
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
 * @returns
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
 * @param email
 * @returns
 */
UserModel.getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = _a.queryBuilder()
        .table("users")
        .leftJoin("roles", "users.role_id", "=", "roles.id")
        .select("users.name", "users.email", "roles.role_name")
        .where({ email })
        .first();
    return yield query;
});
UserModel.updateUser = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    //check if role is available and valid
    if (userDetails.role) {
        const role = yield _a.getRoleById(userDetails.role);
        console.log(role);
        if (!role) {
            console.log("no user");
            return;
        }
    }
    //update user
    yield _a.queryBuilder().update(userDetails).table("users").where({ id });
    const user = yield _a.getUserById(id);
    return user;
});
UserModel.getRoleByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield _a.queryBuilder()
        .select("*")
        .table("roles")
        .where({ role_name: name })
        .first();
    return role;
});
UserModel.getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield _a.queryBuilder().select("*").table("roles").first();
    return role;
});
let users = [
    {
        id: "1",
        name: "test",
        email: "test@test.com",
        password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
        role: "superAdmin" /* userRole.SUPER_USER */,
    },
    {
        id: "2",
        email: "ming@test.com",
        name: "ming",
        password: "$2b$10$VpERQZT46YsPELr0ZJyLceIyW7zJcf1d1mZf6Os9HC2dtkTiLbd6K",
        role: "user" /* userRole.USER */,
    },
];
/**
 * Create a user
 *
 * @param {IUser} user - details of the user
 */
const createUser = (user) => {
    users.push(Object.assign({ id: `${users.length + 1}` }, user));
};
exports.createUser = createUser;
/**
 * Get all users
 *
 * @returns {IUser[]}
 */
const getAllUsers = (query) => {
    const { q } = query;
    console.log("inside model");
    if (q) {
        return users.filter((user) => user.name.includes(q));
    }
    return users;
};
exports.getAllUsers = getAllUsers;
/**
 * Get user by email
 *
 * @param {string} email - email of the user
 * @returns {IUser | undefined} user - details of the user
 */
const getUserByEmail = (email) => {
    const user = users.find(({ email: userEmail }) => userEmail === email);
    return user;
};
exports.getUserByEmail = getUserByEmail;
/**
 *  Get a user by id
 *
 * @param {string} id - id of the user
 * @returns {IUser | undefined} - user
 */
const getUserById = (id) => {
    const user = users.find(({ id: userId }) => userId === id);
    return user;
};
exports.getUserById = getUserById;
/**
 * Delete a user by id
 *
 * @param {string} id
 * @returns {IUser} - deleted user
 */
const deleteUserById = (id) => {
    const user = (0, exports.getUserById)(id);
    users = users.filter(({ id: userId }) => userId !== id);
    return user;
};
exports.deleteUserById = deleteUserById;
/**
 * Update a user by id
 *
 * @param id
 * @param updatedUser
 * @returns {IUser} - deleted user
 */
const updateUser = (id, updatedUser) => {
    let user = users.find(({ id: userId }) => userId === id);
    user = Object.assign(Object.assign({}, user), updatedUser);
    users = [...users.filter(({ id: userId }) => userId !== id), user];
    return user;
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map