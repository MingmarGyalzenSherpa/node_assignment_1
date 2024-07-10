import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { getUserByEmail } from "./userServices";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../config";

/**
 * Login a user
 * @param user
 * @returns {Promise<object>} - accessToken and refreshToken or error message
 */
export const login = async (
  user: Pick<IUser, "email" | "password">
): Promise<object> => {
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
    role: existingUser.role,
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

/**
 * Refresh access token
 * @param {string} refreshToken - refresh token
 * @returns {object} - new access token or error message
 */
export const refresh = (refreshToken: string): object => {
  if (!refreshToken) {
    return {
      message: "Invalid",
    };
  }

  const isValidToken = verify(refreshToken, config.jwt.secret) as JwtPayload;
  if (!isValidToken) {
    return {
      message: "Invalid",
    };
  }

  const payload = {
    id: isValidToken.id,
    name: isValidToken.name,
    email: isValidToken.email,
  };

  const accessToken = sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.accessTokenExpiryMS),
  });

  return {
    accessToken,
  };
};
