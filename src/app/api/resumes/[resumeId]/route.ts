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

export async function PUT(
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
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { resumeId } = await params;
    const body = await req.json();

    // Remove immutable and system fields to prevent Mongoose CastErrors
    const updateData = { ...body };
    delete updateData._id;
    delete updateData.user_id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedResume = await ResumeModel.findOneAndUpdate(
      { _id: resumeId, user_id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedResume) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedResume, { status: 200 });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { resumeId } = await params;
    const result = await ResumeModel.deleteOne({ _id: resumeId, user_id: userId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
