import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { endpoint, payload, method = "POST" } = await req.json();

    if (!endpoint) {
      return NextResponse.json({ message: "Endpoint is required" }, { status: 400 });
    }

    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) throw new Error("API_BASE_URL is not defined");

    // Ensure the endpoint is correctly formatted
    const apiUrl = `${apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    console.log(`Proxying request to: ${apiUrl}`);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { data } = await axios({
      url: apiUrl,
      method,
      data: payload,
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Proxy Error:", error);
    // return NextResponse.json(
    //   { message: error.response?.data?.message || "Server Error" },
    //   { status: error.response?.status || 500 }
    // );
  }
}
