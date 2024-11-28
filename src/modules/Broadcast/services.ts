// src/modules/Broadcast/services.ts

import { Client, Message } from "@line/bot-sdk";

export const broadcastMessageService = async (client: Client, messages: Message[]) => {
    try {
        await client.broadcast(messages);
        return { success: true, message: "Broadcast message sent successfully" };
    } catch (error) {
        console.error("Error broadcasting message:", error);
        return { success: false, error: "Failed to broadcast message" };
    }
};
