import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const callChatGPT = async (message: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });
        return response.choices[0]?.message?.content?.trim() || "No response";
    } catch (error: any) {
        console.log(error);
        if (error.status === 429) {
            console.error("Rate limit exceeded or insufficient quota.");
            return "ระบบของเราถูกใช้งานเกินขีดจำกัด กรุณาลองใหม่อีกครั้งในภายหลัง";
        }

        console.error("Error calling ChatGPT API:", error);
        return "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
};

