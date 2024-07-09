import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { getUserByEmail } from "./userServices";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../config";
import IUserPayload from "../interfaces/IUserPayload";

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

export const refresh = (oldRefreshToken: string) => {
  if (!oldRefreshToken) {
    return {
      message: "Invalid",
    };
  }

  const isValidToken = verify(oldRefreshToken, config.jwt.secret) as JwtPayload;
  if (!isValidToken) {
    return {
      message: "Invalid",
    };
  }

  const payload: IUserPayload = {
    id: isValidToken.id,
    name: isValidToken.name,
    email: isValidToken.email,
  };

  const accessToken = sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.accessTokenExpiryMS),
  });

  const newRefreshToken = sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.refreshTokenExpiryMS),
  });

  return {
    accessToken,
    newRefreshToken,
  };
};
