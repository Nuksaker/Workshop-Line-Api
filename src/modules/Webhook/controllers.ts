import { Request, Response } from "express";
import { WebhookEvent } from "@line/bot-sdk";
import { handleWebhookEvent } from "./services";

export const webhookController = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = req.body.events;
        console.log(events);
        
        await Promise.all(events.map(handleWebhookEvent));

        res.status(200).end(); // ต้องตอบกลับสถานะ 200
    } catch (error) {
        console.error("Error handling webhook event:", error);
        res.status(500).send("Error handling webhook event");
    }
};
