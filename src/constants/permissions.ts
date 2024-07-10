import { userRole } from "./userRole";

export const permissions: Record<userRole, string[]> = {
  superUser: [
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
