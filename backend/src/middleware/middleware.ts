import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { COOKIE_DOMAIN, JWT_SECRET, NodeEnv } from "../config";
import { prisma } from "../lib/db";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.cookies?.token

    if (!token) {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: NodeEnv === "production",
            domain: NodeEnv === "production" ? COOKIE_DOMAIN : undefined
        })
        res.status(401).json({
            message: "Unauthorized Access - No token provided"
        })
        return
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET) as JwtPayload
        if (!verified.userId) {
            res.status(401).json({
                message: "Unauthorized - Invalid Token Payload"
            })
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: verified.userId
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullname: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            res.status(404).json({
                message: "Unauthorized - User not found"
            })
            return;
        }
        req.user = user
        next()
    } catch (error) {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: NodeEnv === "production",
            domain: NodeEnv === "production"
                ? COOKIE_DOMAIN
                : undefined
        });

        const message =
            error instanceof TokenExpiredError
                ? "Unauthorized - Token Expired"
                : "Unauthorized - Invalid Token";
        res.status(401).json({ message });
    }
}