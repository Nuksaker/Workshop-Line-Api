// src/modules/Quota/services.ts

import { Client } from "@line/bot-sdk";

export const getQuotaService = async (client: Client) => {
    try {
        // const quota = await client.getMessageQuota();
        return { success: true };
    } catch (error) {
        console.error("Error getting quota:", error);
        return { success: false, error: "Failed to get quota" };
    }
};
