import { Router } from "express";
import { sendMessageController, sendMessageFormController, sendMulticastController } from "./controllers";

const router = Router();

// เส้นทางสำหรับส่งข้อความเดี่ยว
router.post("/send", sendMessageController);
router.post("/", sendMessageFormController);

// เส้นทางสำหรับส่งข้อความแบบ Multicast
router.post("/multicast", sendMulticastController);

export const messageRoutes = router;
