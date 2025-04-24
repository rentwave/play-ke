// /api/proxy/json/route.ts

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

        const response = await axios({
            url: `${apiBaseUrl.replace(/\/$/, "")}/`,
            method: "POST",
            data: { route: endpoint, data: payload },
            headers: { "Content-Type": "application/json" },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), // ⚠️ dev only
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("JSON proxy error:", error);
        return NextResponse.json({ message: "Request failed" }, { status: 500 });
    }
}
