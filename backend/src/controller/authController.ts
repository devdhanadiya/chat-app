import { Request, Response } from "express";
import { prisma } from "../lib/db";
import { registerSchema, loginSchema } from "../zod/userSchema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { COOKIE_DOMAIN, JWT_SECRET, NodeEnv } from "../config";
import cloudinary from "../lib/cloudinary";

export const register = async (req: Request, res: Response) => {
    try {
        const { success, error, data } = registerSchema.safeParse(req.body)
        if (!success) {
            res.status(400).json({
                message: "Invalid Inputs",
                error: error.flatten().fieldErrors
            })
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existingUser) {
            if (existingUser.email === data.email) {
                res.status(409).json({
                    message: "Email already exists.",
                })
            }
            return
        }

        const { email, username, fullname, password } = data
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                username,
                fullname,
                password: hashedPass
            }
        })

        const userId = user.id
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: true,
            secure: NodeEnv === "production",
            domain: NodeEnv === "production" ? COOKIE_DOMAIN : undefined
        })

        res.status(201).json({
            message: "User register successfully",
            email: email,
            token: token
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { success, error, data } = loginSchema.safeParse(req.body)
        if (!success) {
            res.status(411).json({
                message: "Invaild Inputs",
                error: error.flatten().fieldErrors
            })
            return
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        const response = await bcrypt.compare(data.password, user.password)
        if (!response) {
            res.status(401).json({
                message: "Incorrect Credentials"
            })
            return
        }

        const userId = user.id
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: true,
            secure: NodeEnv === "production",
            domain: NodeEnv === "production" ? COOKIE_DOMAIN : undefined
        })

        res.status(200).json({
            message: "User loggedin successfully",
            email: user.email,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: NodeEnv === "production",
            domain: NodeEnv === "production" ? COOKIE_DOMAIN : undefined
        })
        res.status(200).json({
            message: "Logged out Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { profilePic } = req.body
        const userId = req.user?.id
        if (!profilePic) {
            res.status(400).json({
                message: "Profile picture is required"
            })
            return
        }

        const uploadResult = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profilePic: uploadResult.secure_url }
        })
        res.status(200).json({ updatedUser })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user
        if (!user) {
            res.status(401).json({
                message: "Unauthorized - Not authenticated"
            })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}