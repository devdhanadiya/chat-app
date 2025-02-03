import { Router } from "express";
import authMiddleware from "../middleware/middleware";
import { getUsersForSideBar, getMessage, sendMessage } from "../controller/messageController";

const messageRouter = Router();
messageRouter.get("/users", authMiddleware, getUsersForSideBar);
messageRouter.get("/:id", authMiddleware, getMessage);
messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
