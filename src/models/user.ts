import IUser from "../interfaces/IUser";

let users: IUser[] = [];

export const createUser = (user: IUser) => {
  console.log("here");
  users.push(...users, {
    id: `${users.length + 1}`,
    ...user,
  });
  console.log(users);
};
