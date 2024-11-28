// src/modules/Quota/routes.ts

import { Router } from "express";
import { getQuotaController } from "./controllers";

const router = Router();

router.get("/remaining", getQuotaController);

export const quotaRoutes = router;
