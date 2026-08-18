import connectDB from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    let userId: string;
    try {
      userId = await getCurrentUser();
    } catch {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const newResume = await ResumeModel.create({
      user_id: userId,
      title: body.title || "Developer Resume",
      summary: body.summary || "",
      personalInfo: body.personalInfo || {},
      education: body.education || [],
      workExperience: body.workExperience || [],
      projects: body.projects || [],
      skills: body.skills || [],
      certifications: body.certifications || [],
      achievements: body.achievements || [],
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}