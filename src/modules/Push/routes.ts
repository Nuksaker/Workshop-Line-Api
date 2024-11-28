// src/modules/Push/routes.ts

import { Router } from "express";
import { pushMessageController } from "./controllers";

const router = Router();

router.post("/send", pushMessageController);

export const pushRoutes = router;
