import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: process.env.ACCESS_TOKEN_EXPIRY_MS,
    refreshTokenExpiryMS: process.env.REFRESH_TOKEN_EXPIRY_MS,
  },
};
