"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
let users = [
    {
        id: "1",
        name: "test",
        email: "test@test.com",
        password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
    },
];
const createUser = (user) => {
    users.push(...users, Object.assign({ id: `${users.length + 1}` }, user));
    console.log(users);
};
exports.createUser = createUser;
const getUserByEmail = (email) => {
    const user = users.find(({ email: userEmail }) => userEmail === email);
    return user;
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=user.js.map