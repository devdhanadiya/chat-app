import { Router } from "express";
import { register, login, logout, updateProfile, checkAuth } from "../controller/authController";
import authMiddleware from "../middleware/middleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", authMiddleware, updateProfile);
authRouter.get("/check-auth", authMiddleware, checkAuth);

export default authRouter;
