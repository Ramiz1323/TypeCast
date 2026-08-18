import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    let userId: string;
    try {
      userId = await getCurrentUser();
    } catch {
      return NextResponse.json(
        { success: false, message: "Unauthorized access. Token not found." },
        { status: 401 }
      );
    }

    const resumes = await ResumeModel.find({ user_id: userId }).sort({ updatedAt: -1 });

    return NextResponse.json(resumes, { status: 200 });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}
