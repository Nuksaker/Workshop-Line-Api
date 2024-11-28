// src/modules/Broadcast/controllers.ts

import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { broadcastMessageService } from "./services";
import { Message } from "@line/bot-sdk";

export const broadcastMessageController = async (req: Request, res: Response) => {
    const { messages } = req.body as { messages: Message[] };

    if (!messages) {
        res.status(400).send("Missing 'messages' in request body");
        return;
    }

    try {
        const result = await broadcastMessageService(lineClient, messages);

        if (result.success) {
            res.status(200).send({ message: result.message });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (error) {
        console.error("Error in broadcastMessageController:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
