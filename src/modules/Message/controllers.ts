import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { sendMessageService, sendMulticastService } from "./services";
import dotenv from "dotenv";
dotenv.config();

interface Body {
    userId: string;
    text: string;
}

interface BodyMulticast {
    userIds: string[];
    text: string;
}

// ตรวจสอบว่าฟังก์ชันถูก export อย่างถูกต้อง
export const sendMessageController = async (req: Request, res: Response): Promise<void> => {
    const { userId, text } = req.body as Body;
    const userIdKey = process.env.USER_ID_KEY as string;
    if (!userIdKey || !text) {
        res.status(400).send("Missing userId or text in request body");
        return;
    }

    try {
        const result = await sendMessageService(lineClient, userIdKey, text);

        if (result.success) {
            res.status(200).send({ message: "Message sent successfully" });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

// ตรวจสอบว่าฟังก์ชันถูก export อย่างถูกต้อง
export const sendMessageFormController = async (req: Request, res: Response): Promise<void> => {
    const { userId, text } = req.body as Body;
    const userIdKey = process.env.USER_ID_KEY as string;
    if (!userIdKey || !text) {
        res.status(400).send("Missing userId or text in request body");
        return;
    }

    try {
        const result = await sendMessageService(lineClient, userIdKey, text);

        if (result.success) {
            res.status(200).send({ message: "Message sent successfully" });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const sendMulticastController = async (req: Request, res: Response): Promise<void> => {
    const { userIds, text } = req.body as BodyMulticast;

    if (!userIds || !Array.isArray(userIds) || !text) {
        res.status(400).send("Missing userIds or text in request body");
        return;
    }

    try {
        const result = await sendMulticastService(lineClient, userIds, text);

        if (result.success) {
            res.status(200).send({ message: "Messages sent successfully" });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};
