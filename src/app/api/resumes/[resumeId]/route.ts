import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
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

    const { resumeId } = await params;
    const resume = await ResumeModel.findOne({ _id: resumeId, user_id: userId });

    if (!resume) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
