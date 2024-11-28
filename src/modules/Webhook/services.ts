import { WebhookEvent, MessageAPIResponseBase, TextMessage } from "@line/bot-sdk";
import { lineClient } from "../../config/config";
import { callChatGPT } from "../../services/openai";
import { callAI21 } from "../../services/ai21";
import { readUserPreferences, writeUserPreferences } from "../../utils/jsonHelper";

export const handleWebhookEvent = async (event: WebhookEvent): Promise<MessageAPIResponseBase | void> => {
    try {
        if (event.type === "message" && event.message.type === "text") {
            const userId = event.source.userId; // ดึง User ID จาก event
            const userMessage = event.message.text;
            const replyToken = event.replyToken;

            // ตรวจสอบว่า userId มีค่าหรือไม่
            if (!userId) {
                console.error("User ID is undefined");
                const replyMessage: TextMessage = {
                    type: "text",
                    text: "ไม่สามารถระบุ User ID ได้ กรุณาลองใหม่อีกครั้ง",
                };
                await lineClient.replyMessage(replyToken, replyMessage);
                return;
            }

            // โหลดสถานะผู้ใช้จากไฟล์ JSON
            const userPreferences = await readUserPreferences();

            // ถ้าผู้ใช้ยังไม่ได้เลือกโหมด
            if (!userPreferences[userId]) {
                if (userMessage === "สวัสดี") {
                    const replyMessage: TextMessage = {
                        type: "text",
                        text: "คุณต้องการคุยกับ ChatGPT หรือคุยปกติ? กรุณาพิมพ์ 'ChatGPT' หรือ 'ปกติ'",
                    };
                    await lineClient.replyMessage(replyToken, replyMessage);
                    return;
                }

                if (userMessage.toLowerCase() === "chatgpt") {
                    userPreferences[userId] = true; // ตั้งค่าใช้ ChatGPT
                    await writeUserPreferences(userPreferences); // บันทึกลง JSON
                    const replyMessage: TextMessage = {
                        type: "text",
                        text: "คุณได้เลือกคุยกับ ChatGPT แล้ว!",
                    };
                    await lineClient.replyMessage(replyToken, replyMessage);
                    return;
                }

                if (userMessage.toLowerCase() === "ปกติ") {
                    userPreferences[userId] = false; // ตั้งค่าใช้คุยปกติ
                    await writeUserPreferences(userPreferences); // บันทึกลง JSON
                    const replyMessage: TextMessage = {
                        type: "text",
                        text: "คุณได้เลือกคุยแบบปกติแล้ว!",
                    };
                    await lineClient.replyMessage(replyToken, replyMessage);
                    return;
                }
            }

            // ถ้าผู้ใช้เลือกโหมดแล้ว
            if (userMessage === "เปลี่ยนโหมด") {
                delete userPreferences[userId]; // ลบสถานะเดิม
                await writeUserPreferences(userPreferences); // บันทึกลง JSON
                const replyMessage: TextMessage = {
                    type: "text",
                    text: "กรุณาพิมพ์ 'ChatGPT' หรือ 'ปกติ' เพื่อเลือกโหมดใหม่",
                };
                await lineClient.replyMessage(replyToken, replyMessage);
                return;
            }

            // ตรวจสอบโหมดของผู้ใช้
            if (userPreferences[userId]) {
                // คุยกับ ChatGPT
                const chatGPTResponse = await callAI21(userMessage);
                const replyMessage: TextMessage = {
                    type: "text",
                    text: chatGPTResponse,
                };
                await lineClient.replyMessage(replyToken, replyMessage);
            } else {
                // คุยแบบปกติ
                const replyMessage: TextMessage = {
                    type: "text",
                    text: `คุณพิมพ์ว่า: ${userMessage}`,
                };
                await lineClient.replyMessage(replyToken, replyMessage);
            }
        }
    } catch (error) {
        console.error("Error handling event:", error);
        throw error;
    }
};
