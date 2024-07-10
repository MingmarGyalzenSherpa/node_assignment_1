import { userRole } from "../constants/userRole";
import IUser from "../interfaces/IUser";

let users: IUser[] = [
  {
    id: "1",
    name: "test",
    email: "test@test.com",
    password: "$2b$10$cOMTC5jxv5hRZ8VHGTRMce7CIm.owtUdZIKJ73ZY5xL9ePIWMm2Re",
    role: userRole.SUPER_USER,
  },
  {
    id: "2",
    email: "ming@test.com",
    name: "ming",
    password: "$2b$10$VpERQZT46YsPELr0ZJyLceIyW7zJcf1d1mZf6Os9HC2dtkTiLbd6K",
    role: userRole.USER,
  },
];

/**
 * Create a user
 * @param {IUser} user - details of the user
 */
export const createUser = (user: IUser) => {
  users.push({
    id: `${users.length + 1}`,
    ...user,
  });
};

/**
 * Get all users
 * @returns {IUser[]}
 */
export const getAllUsers = (): IUser[] => users;

/**
 * Get user by email
 * @param {string} email - email of the user
 * @returns {IUser} user - details of the user
 */
export const getUserByEmail = (email: string): IUser => {
  const user = users.find(({ email: userEmail }) => userEmail === email);

  return user;
};

/**
 *  Get a user by id
 * @param {string} id - id of the user
 * @returns {IUser} - user
 */
export const getUserById = (id: string): IUser => {
  const user = users.find(({ id: userId }) => userId === id);

  return user;
};

/**
 * Delete a user by id
 * @param {string} id
 * @returns {IUser} - deleted user
 */
export const deleteUserById = (id: string): IUser => {
  const user = getUserById(id);

  users = users.filter(({ id: userId }) => userId !== id);

  return user;
};

export const updateUser = (id: string, updatedUser: IUser) => {
  let user = users.find(({ id: userId }) => userId === id);

  user = { ...user, ...updatedUser };

  users = [...users.filter(({ id: userId }) => userId !== id), user];

  return user;
};
