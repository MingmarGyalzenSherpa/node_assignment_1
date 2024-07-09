"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
let users = [];
const createUser = (user) => {
    console.log("here");
    users.push(...users, Object.assign({ id: `${users.length + 1}` }, user));
    console.log(users);
};
exports.createUser = createUser;
//# sourceMappingURL=user.js.map