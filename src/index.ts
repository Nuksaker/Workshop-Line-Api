import express from "express";
import dotenv from "dotenv";
import { appRoutes } from "./routes";
import { webhookRoutes } from "./modules/Webhook/routes";
import { middleware } from "@line/bot-sdk";
import { lineConfig } from "./config/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

dotenv.config();

const app = express();
// Test Pull File 
// Middleware สำหรับ Webhook - ใช้ raw body parser
app.use("/webhook", express.raw({ type: 'application/json' }), middleware(lineConfig), webhookRoutes);

// Middleware สำหรับ parse JSON สำหรับเส้นทางอื่น ๆ
app.use(express.json());

// เส้นทาง Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// เส้นทางอื่น ๆ ของแอปพลิเคชัน
app.use("/api", appRoutes);

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
