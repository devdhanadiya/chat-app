import { Router } from "express";
import authRouter from "./authRouter";
import messageRouter from "./messageRouter";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/messages", messageRouter);

export default rootRouter; // Root Router for the application
