import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Clone the request to be able to read it multiple times if needed
    const reqClone = req.clone();
    const requestText = await reqClone.text();
    console.log("Raw request body:", requestText);

    let requestData;
    try {
      requestData = JSON.parse(requestText);
    } catch (e) {
      console.error("Failed to parse request body as JSON:", e);
      return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 });
    }

    const { endpoint, payload } = requestData;
    // Force method to always be POST regardless of what's provided
    const method = "POST";

    if (!endpoint) {
      return NextResponse.json({ message: "Endpoint is required" }, { status: 400 });
    }

    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
      console.error("API_BASE_URL is not defined in environment variables");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    // Ensure the endpoint is correctly formatted
    const apiUrl = `${apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    console.log("Proxying request to:", apiUrl);
    console.log("Request method (enforced):", method);
    console.log("Request payload:", JSON.stringify(payload, null, 2));
    console.log("Payload type:", typeof payload);

    // Create axios config with detailed debugging and enforced POST method
    const axiosConfig = {
      url: apiUrl,
      method: "POST",
      data: { data: payload }, // Don't stringify again!
      headers: {
        "Content-Type": "application/json"
      },
    };

    console.log("Final axios configuration:", JSON.stringify(axiosConfig, null, 2));

    // Make the request
    const response = await axios(axiosConfig);

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response data:", typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data);

    return NextResponse.json(response.data);

  } catch (error: unknown) {
    console.error("Proxy Error:", error);
  }
}