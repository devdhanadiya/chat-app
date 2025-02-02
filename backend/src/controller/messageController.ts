import { Request, Response } from "express";
import { prisma } from "../lib/db";
import { getRecieverSocketId } from "../lib/socket"
import cloudinary from "../lib/cloudinary";

export const getUsersForSideBar = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req.user?.id
        const filteredUsers = await prisma.user.findMany({
            where: {
                NOT: {
                    id: loggedInUser
                }
            },
            select: {
                id: true,
                fullname: true,
                profilePic: true
            }
        })
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in Retrieving data")
        res.status(400).json({ message: "Internal Server Error" })
    }
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const myId = req.user?.id

        const message = await prisma.messages.findMany({
            where: {
                OR: [
                    { senderId: myId, receiverId: id },
                    { senderId: id, receiverId: myId }
                ],
            },
        });
        res.status(200).json(message)
    } catch (error) {
        console.log("Error is: ", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?.id;

        if (!senderId) {
            res.status(400).json({ error: "Sender ID is required" });
            return;
        }

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await prisma.messages.create({
            data: {
                senderId,
                receiverId,
                text,
                image: imageUrl,
            },
            include: {
                sender: true,
                receiver: true,
            },
        });

        const receiverSocket = getRecieverSocketId(receiverId);
        if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
            receiverSocket.send(
                JSON.stringify({
                    type: "newMessage",
                    message: newMessage,
                }),
            );
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};