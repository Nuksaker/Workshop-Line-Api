import { Router } from "express";
import { messageRoutes } from "../modules/Message/routes";
import { stickerRoutes } from "../modules/Sticker/routes";
import { pushRoutes } from "../modules/Push/routes";
import { broadcastRoutes } from "../modules/Broadcast/routes";
import { quotaRoutes } from "../modules/Quota/routes";
import { mediaRoutes } from "../modules/Media/routes";

const router = Router();

router.use("/message", messageRoutes);
router.use("/sticker", stickerRoutes);
router.use("/push", pushRoutes);
router.use("/broadcast", broadcastRoutes);
router.use("/quota", quotaRoutes);
router.use("/media", mediaRoutes);

export const appRoutes = router;
