import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { getUserByEmail } from "./userServices";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../config";
import { NotFoundError } from "../error/NotFoundError";
import * as messageGenerator from "../utils/messageGenerator";
import { UnAuthorizedError } from "../error/UnAuthorizedError";

/**
 * Login a user
 *
 * @param user
 * @returns {Promise<object>} - accessToken and refreshToken
 */
export const login = async (
  user: Pick<IUser, "email" | "password">
): Promise<object> => {
  const existingUser = getUserByEmail(user.email);

  if (!existingUser) {
    throw new NotFoundError(messageGenerator.invalid("email or password"));
  }
  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new NotFoundError(messageGenerator.invalid("email or password"));
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
 *
 * @param {string} refreshToken - refresh token
 * @returns {object} - new access token
 */
export const refresh = (refreshToken: string): object => {
  if (!refreshToken) {
    throw new NotFoundError(messageGenerator.notFound("Refresh Token"));
  }

  const isValidToken = verify(refreshToken, config.jwt.secret) as JwtPayload;
  if (!isValidToken) {
    throw new UnAuthorizedError(messageGenerator.invalid("Refresh Token"));
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
