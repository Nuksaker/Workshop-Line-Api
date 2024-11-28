// src/modules/Push/services.ts

import { Client, Message } from "@line/bot-sdk";

export const pushMessageService = async (
    client: Client,
    to: string,
    messages: Message[]
) => {
    try {
        await client.pushMessage(to, messages);
        return { success: true, message: "Message pushed successfully" };
    } catch (error) {
        console.error("Error pushing message:", error);
        return { success: false, error: "Failed to push message" };
    }
};
