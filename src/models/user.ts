import IUser from "../interfaces/IUser";

let users: IUser[] = [
  {
    id: "1",
    name: "test",
    email: "test@test.com",
    password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
  },
];

export const createUser = (user: IUser) => {
  users.push(...users, {
    id: `${users.length + 1}`,
    ...user,
  });
  console.log(users);
};

export const getUserByEmail = (email: string) => {
  const user = users.find(({ email: userEmail }) => userEmail === email);
  return user;
};
