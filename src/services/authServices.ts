import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { getUserByEmail } from "./userServices";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../config";
import { NotFoundError } from "../error/NotFoundError";
import * as messageGenerator from "../utils/messageGenerator";
import { UnAuthorizedError } from "../error/UnAuthorizedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Auth Services");
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

  //log
  logger.info("Started login service");

  if (!existingUser) {
    const message = messageGenerator.invalid("email or password");
    logger.error(message);
    throw new NotFoundError(message);
  }

  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isValidPassword) {
    const message = messageGenerator.invalid("email or password");
    logger.error(message);
    throw new NotFoundError(message);
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

  logger.info("Exiting login service");

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
  logger.info("Starting access token refresh service");

  if (!refreshToken) {
    const message = messageGenerator.notFound("Refresh Token");

    logger.error(message);
    throw new NotFoundError(message);
  }

  try {
    const isValidToken = verify(refreshToken, config.jwt.secret) as JwtPayload;

    const payload = {
      id: isValidToken.id,
      name: isValidToken.name,
      email: isValidToken.email,
    };

    const accessToken = sign(payload, config.jwt.secret, {
      expiresIn: parseInt(config.jwt.accessTokenExpiryMS),
    });

    logger.info("Exiting access token refresh service");

    return {
      accessToken,
    };
  } catch (error) {
    const message = messageGenerator.invalid("Refresh Token");
    logger.error(message);
    throw new UnAuthorizedError(message);
  }
};
