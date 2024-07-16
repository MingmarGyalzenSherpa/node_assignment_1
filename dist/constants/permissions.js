"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
exports.permissions = {
    superAdmin: [
        "user.get",
        "user.create",
        "user.delete",
        "user.update",
        "todo.get",
        "todo.create",
        "todo.delete",
        "todo.update",
    ],
    user: ["todo.get", "todo.create", "todo.delete", "todo.update"],
};
//# sourceMappingURL=permissions.js.map