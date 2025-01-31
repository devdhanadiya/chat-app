import { Router } from "express";
import { authRouter } from "./authRouter";
import { messageRouter } from "./messageRouter";

const router = Router()

router.use("/auth", authRouter)
router.use("/message", messageRouter)

export { router as rootRouter } //Root Router for the application