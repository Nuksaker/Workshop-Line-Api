// src/modules/Quota/controllers.ts

import { Request, Response } from "express";
import { lineClient } from "../../config/config";
import { getQuotaService } from "./services";

export const getQuotaController = async (req: Request, res: Response) => {
    try {
        const result = await getQuotaService(lineClient);

        if (result.success) {
            res.status(200).send(result);
        } else {
            res.status(500).send({ error: result.error });
        }
    } catch (error) {
        console.error("Error in getQuotaController:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
