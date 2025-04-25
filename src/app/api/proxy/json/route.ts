import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function POST(req: Request) {
    try {
        const apiBaseUrl = process.env.API_BASE_URL;
        if (!apiBaseUrl) {
            return NextResponse.json({ message: "Server config error" }, { status: 500 });
        }

        const { endpoint, payload } = await req.json();
        if (!endpoint) {
            return NextResponse.json({ message: "Endpoint is required" }, { status: 400 });
        }

        // Use the base URL directly without appending the endpoint
        console.log(`Proxying request to: ${apiBaseUrl} with route: ${endpoint}`);

        const response = await axios({
            url: apiBaseUrl,
            method: "POST",
            data: { route: endpoint, data: payload },
            headers: {
                "Content-Type": "application/json"
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL config restored
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("JSON proxy error:", error);

        // Provide more detailed error information
        const errorMessage = error.response?.data || error.message || "Unknown error";
        const statusCode = error.response?.status || 500;

        return NextResponse.json({
            message: "Request failed",
            error: errorMessage
        }, { status: statusCode });
    }
}