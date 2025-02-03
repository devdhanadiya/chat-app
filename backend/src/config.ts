import { config } from "dotenv";

config();

export const { PORT } = process.env;
export const NodeEnv = process.env.NODE_ENV;
export const { PROD_URL } = process.env;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const { COOKIE_DOMAIN } = process.env;
