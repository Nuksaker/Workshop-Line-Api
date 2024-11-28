// src/modules/Push/controllers.ts

import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { pushMessageService } from "./services";
import { Message } from "@line/bot-sdk";

export const pushMessageController = async (req: Request, res: Response) => {
    const { to, messages } = req.body as { to: string; messages: Message[] };

    if (!to || !messages) {
        res.status(400).send("Missing 'to' or 'messages' in request body");
        return;
    }

    try {
        const result = await pushMessageService(lineClient, to, messages);

        if (result.success) {
            res.status(200).send({ message: result.message });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (error) {
        console.error("Error in pushMessageController:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
