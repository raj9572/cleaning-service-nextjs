import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Allow your frontend (Vite)
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: res.headers,
    });
  }

  return res;
}

// Apply ONLY to API routes
export const config = {
  matcher: "/api/:path*",
};
