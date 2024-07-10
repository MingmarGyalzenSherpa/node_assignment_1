"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
let users = [
    {
        id: "1",
        name: "test",
        email: "test@test.com",
        password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
        role: "superUser" /* userRole.SUPER_USER */,
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
 * @param {IUser} user - details of the user
 */
const createUser = (user) => {
    console.log(users);
    users.push(Object.assign({ id: `${users.length + 1}` }, user));
};
exports.createUser = createUser;
/**
 * Get user by email
 * @param {string} email - email of the user
 * @returns {IUser} user - details of the user
 */
const getUserByEmail = (email) => {
    const user = users.find(({ email: userEmail }) => userEmail === email);
    return user;
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=user.js.map