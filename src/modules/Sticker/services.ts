import { Client, StickerMessage } from "@line/bot-sdk";

export const sendStickerService = async (
    client: Client,
    userId: string,
    packageId: string,
    stickerId: string
) => {
    const message: StickerMessage = {
        type: "sticker",
        packageId,
        stickerId,
    };

    try {
        await client.pushMessage(userId, message);
        return { success: true, message: "Sticker sent successfully" };
    } catch (error) {
        console.error("Error sending sticker:", error);
        return { success: false, error: "Failed to send sticker" };
    }
};

export const sendStickerMulticastService = async (
    client: Client,
    userIds: string[],
    packageId: string,
    stickerId: string
) => {
    const message: StickerMessage = {
        type: "sticker",
        packageId,
        stickerId,
    };

    try {
        await client.multicast(userIds, [message]);
        return { success: true, message: "Stickers sent successfully" };
    } catch (error) {
        console.error("Error sending sticker multicast:", error);
        return { success: false, error: "Failed to send sticker multicast" };
    }
};
