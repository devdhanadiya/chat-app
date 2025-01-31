import { Router } from "express";
import { register, login, logout, updateProfile, checkAuth } from "../controller/authController";
import { authMiddleware } from "../middleware/middleware";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", authMiddleware, updateProfile)
router.get("/check-auth", authMiddleware, checkAuth)

export { router as authRouter } //Authentication Router for the application