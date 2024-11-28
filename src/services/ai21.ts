import axios from "axios";

const API_URL = "https://api.ai21.com/studio/v1/j2-ultra/complete";
const API_KEY = "GpZiQavzsKjKqWYliueIDPm0qs068plL";

export const callAI21 = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(
            API_URL,
            {
                prompt: message,
                maxTokens: 50,
                temperature: 0.7,
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );
        return response.data.completions[0]?.data.text.trim() || "ไม่สามารถตอบกลับได้";
    } catch (error) {
        console.error("Error calling AI21 API:", error);
        return "เกิดข้อผิดพลาดในการประมวลผล";
    }
};
