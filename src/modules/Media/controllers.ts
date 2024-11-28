import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { sendImageService, sendVideoService } from "./services";

interface ImageBody {
    userId: string;
    imageUrl: string;
    previewImageUrl?: string;
}

interface VideoBody {
    userId: string;
    videoUrl: string;
    previewImageUrl: string;
}

export const sendImageController = async (req: Request, res: Response): Promise<void> => {
    const { userId, imageUrl, previewImageUrl } = req.body as ImageBody;

    if (!userId || !imageUrl) {
        res.status(400).send("Missing userId or imageUrl in request body");
        return;
    }

    try {
        const result = await sendImageService(lineClient, userId, imageUrl, previewImageUrl);

        if (result.success) {
            res.status(200).send({ message: result.message });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing sendImageController:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const sendVideoController = async (req: Request, res: Response): Promise<void> => {
    const { userId, videoUrl, previewImageUrl } = req.body as VideoBody;

    if (!userId || !videoUrl || !previewImageUrl) {
        res.status(400).send("Missing userId, videoUrl, or previewImageUrl in request body");
        return;
    }

    try {
        const result = await sendVideoService(lineClient, userId, videoUrl, previewImageUrl);

        if (result.success) {
            res.status(200).send({ message: result.message });
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (err) {
        console.error("Error processing sendVideoController:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};
