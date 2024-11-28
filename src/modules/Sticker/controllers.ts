import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { sendStickerService, sendStickerMulticastService } from "./services";

interface StickerBody {
    userId: string;
    packageId: string;
    stickerId: string;
}

interface StickerMulticastBody {
    userIds: string[];
    packageId: string;
    stickerId: string;
}

export const sendStickerController = async (req: Request, res: Response): Promise<void> => {
    const { userId, packageId, stickerId } = req.body as StickerBody;

    if (!userId || !packageId || !stickerId) {
        res.status(400).send("Missing userId, packageId, or stickerId in request body");
        return;
    }

    try {
        const result = await sendStickerService(lineClient, userId, packageId, stickerId);

        if (result.success) {
            res.status(200).send({ message: "Sticker sent successfully" });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const sendStickerMulticastController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userIds, packageId, stickerId } = req.body as StickerMulticastBody;

    if (!userIds || !Array.isArray(userIds) || !packageId || !stickerId) {
        res.status(400).send("Missing userIds, packageId, or stickerId in request body");
        return;
    }

    try {
        const result = await sendStickerMulticastService(
            lineClient,
            userIds,
            packageId,
            stickerId
        );

        if (result.success) {
            res.status(200).send({ message: "Stickers sent successfully" });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};
