import { Router } from "express";
import { sendImageController, sendVideoController } from "./controllers";

const router = Router();

// เส้นทางสำหรับส่งรูปภาพ
router.post("/image", sendImageController);

// เส้นทางสำหรับส่งวิดีโอ
router.post("/video", sendVideoController);

export const mediaRoutes = router;
