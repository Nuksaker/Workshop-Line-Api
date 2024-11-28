import { Router } from "express";
import { sendStickerController, sendStickerMulticastController } from "./controllers";

const router = Router();

// เส้นทางสำหรับส่งสติกเกอร์ให้ผู้ใช้คนเดียว
router.post("/send", sendStickerController);

// เส้นทางสำหรับส่งสติกเกอร์ให้ผู้ใช้หลายคน
router.post("/multicast", sendStickerMulticastController);

export const stickerRoutes = router;
