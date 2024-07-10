export const userRole = {
  superUser: {
    permissions: ["user.get", "user.write", "user.update", "user.delete"],
  },
  user: {
    permissions: ["todo.get", "todo.write", "todo.update", "todo.delete"],
  },
};
