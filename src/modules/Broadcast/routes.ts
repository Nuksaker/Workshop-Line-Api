// src/modules/Broadcast/routes.ts

import { Router } from "express";
import { broadcastMessageController } from "./controllers";

const router = Router();

router.post("/send", broadcastMessageController);

export const broadcastRoutes = router;
