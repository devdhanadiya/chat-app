import { config } from "dotenv";
config()

export const PORT = process.env.PORT
export const NodeEnv = process.env.NODE_ENV
export const PROD_URL = process.env.PROD_URL
export const JWT_SECRET = process.env.JWT_SECRET as string
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN 