// /api/proxy/form/route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function POST(req: Request) {
    try {
        const apiBaseUrl = process.env.API_BASE_URL;
        if (!apiBaseUrl) {
            return NextResponse.json({ message: "Server config error" }, { status: 500 });
        }

        const formData = await req.formData();

        const response = await axios({
            url: apiBaseUrl,
            method: "POST",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), // ⚠️ dev only
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Form proxy error:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}
