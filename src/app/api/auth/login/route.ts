import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Authenticate with backend
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();

    // Set token in secure HttpOnly cookie
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
