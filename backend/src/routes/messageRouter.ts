import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { getUsersForSideBar, getMessage, sendMessage } from "../controller/messageController";

const router = Router()
router.get("/users", authMiddleware, getUsersForSideBar);
router.get("/:id", authMiddleware, getMessage);
router.post("/send/:id", authMiddleware, sendMessage);

export { router as messageRouter }