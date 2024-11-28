import dotenv from "dotenv";
dotenv.config();

const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Your API Documentation",
        version: "1.0.0",
        description: "API documentation for your project",
    },
    servers: [
        {
            url: process.env.PORT + "/api",
            description: "Local server",
        },
    ],
    paths: {
        "/message/send": {
            post: {
                summary: "Send a message to a user",
                tags: ["Message"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userId: { type: "string" },
                                    text: { type: "string" },
                                },
                                required: ["userId", "text"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Message sent successfully",
                    },
                    400: {
                        description: "Missing userId or text in request body",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/message/multicast": {
            post: {
                summary: "Send a message to multiple users",
                tags: ["Message"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userIds: { type: "array", items: { type: "string" } },
                                    text: { type: "string" },
                                },
                                required: ["userIds", "text"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Messages sent successfully",
                    },
                    400: {
                        description: "Missing userIds or text in request body",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
    },
};

export default swaggerSpec;
