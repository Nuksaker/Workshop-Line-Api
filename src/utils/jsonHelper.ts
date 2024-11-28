import fs from "fs/promises";
import path from "path";

const preferencesFilePath = path.resolve(__dirname, "../../storage/userPreferences.json");

export const readUserPreferences = async (): Promise<Record<string, boolean>> => {
    try {
        const data = await fs.readFile(preferencesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading user preferences file:", error);
        return {}; // หากไฟล์อ่านไม่ได้ ให้ส่งว่างๆ กลับ
    }
};

export const writeUserPreferences = async (data: Record<string, boolean>): Promise<void> => {
    try {
        await fs.writeFile(preferencesFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing user preferences file:", error);
        throw error;
    }
};
