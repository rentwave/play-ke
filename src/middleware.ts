import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"]; // Add all allowed origins
  const origin = req.headers.get("origin");

  // Allow requests without an Origin header (like server-to-server requests)
  if (!origin || allowedOrigins.includes(origin)) {
    return NextResponse.next();
  }

  // Reject unauthorized origins
  return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
}

// Apply this middleware to all API routes
export const config = {
  matcher: "/api/:path*",
};
