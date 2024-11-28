import { Router } from "express";
import { webhookController } from "./controllers";

const router = Router();

// กำหนดเส้นทางสำหรับ Webhook
router.post("/", webhookController);

export const webhookRoutes = router;