import { Client, ImageMessage, VideoMessage } from "@line/bot-sdk";

export const sendImageService = async (
    client: Client,
    userId: string,
    imageUrl: string,
    previewImageUrl?: string
) => {
    const message: ImageMessage = {
        type: "image",
        originalContentUrl: imageUrl,
        previewImageUrl: previewImageUrl || imageUrl,
    };

    try {
        await client.pushMessage(userId, message);
        return { success: true, message: "Image sent successfully" };
    } catch (error) {
        console.error("Error sending image:", error);
        return { success: false, error: "Failed to send image" };
    }
};

export const sendVideoService = async (
    client: Client,
    userId: string,
    videoUrl: string,
    previewImageUrl: string
) => {
    const message: VideoMessage = {
        type: "video",
        originalContentUrl: videoUrl,
        previewImageUrl: previewImageUrl,
    };

    try {
        await client.pushMessage(userId, message);
        return { success: true, message: "Video sent successfully" };
    } catch (error) {
        console.error("Error sending video:", error);
        return { success: false, error: "Failed to send video" };
    }
};
