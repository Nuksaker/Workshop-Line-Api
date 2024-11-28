import { Client, ClientConfig, MiddlewareConfig } from "@line/bot-sdk";
import dotenv from "dotenv";

dotenv.config();

const lineConfig: ClientConfig & MiddlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.CHANNEL_SECRET as string,
};

const lineClient = new Client(lineConfig);

export { lineClient, lineConfig };
