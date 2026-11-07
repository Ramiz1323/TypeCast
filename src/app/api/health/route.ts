import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "disconnected";

  try {
    await connectDB();
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      dbStatus = "connected";
    } else if (state === 2) {
      dbStatus = "connecting";
    }
  } catch (error) {
    dbStatus = "error";
  }

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus === "connected";

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus,
      },
      latencyMs: responseTimeMs,
      environment: process.env.NODE_ENV || "development",
    },
    { status: isHealthy ? 200 : 503 }
  );
}

