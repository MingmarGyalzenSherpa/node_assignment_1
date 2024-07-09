import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { getUserByEmail } from "./userServices";
import { sign } from "jsonwebtoken";
import { config } from "../config";

export const login = async (user: Pick<IUser, "email" | "password">) => {
  const existingUser = getUserByEmail(user.email);
  if (!existingUser) {
    return {
      message: "Invalid email or password",
    };
  }
  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      message: "Invalid email or password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.accessTokenExpiryMS),
  });

  const refreshToken = sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.refreshTokenExpiryMS),
  });

  return {
    accessToken,
    refreshToken,
  };
};
