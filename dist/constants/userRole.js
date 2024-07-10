"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRole = void 0;
exports.userRole = {
    superUser: {
        permissions: ["user.get", "user.write", "user.update", "user.delete"],
    },
    user: {
        permissions: ["todo.get", "todo.write", "todo.update", "todo.delete"],
    },
};
//# sourceMappingURL=userRole.js.map