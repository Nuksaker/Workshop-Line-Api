import { Client, Message } from "@line/bot-sdk";

export const sendMessageService = async (client: Client, userId: string, text: string) => {
    const message: Message = {
        type: "text",
        text,
    };

    try {
        await client.pushMessage(userId, message);
        return { success: true, message: "Message sent successfully" };
    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false, error: "Failed to send message" };
    }
};

export const sendMulticastService = async (client: Client, userIds: string[], text: string) => {
    const message: Message = {
        type: "text",
        text,
    };

    try {
        await client.multicast(userIds, [message]);
        return { success: true, message: "Messages sent successfully" };
    } catch (error) {
        console.error("Error sending multicast:", error);
        return { success: false, error: "Failed to send multicast" };
    }
};
