import { generateAiResponse } from "@/lib/gemini";
import { AtsScoreBody, AtsScoreResult } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: AtsScoreBody = await req.json();

    const { resumeText } = body;

    // Validate resume text
    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Resume text is required",
          data: null,
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) evaluator and technical recruiter.

Analyze the following resume and calculate its ATS score.

Resume:
"""
${resumeText}
"""

Evaluate the resume based on:

1. ATS keyword optimization
2. Resume structure
3. Professional summary
4. Work experience
5. Technical skills
6. Projects
7. Education
8. Action-oriented language
9. Quantifiable achievements
10. Readability and ATS compatibility
11. Overall relevance and effectiveness

Scoring Rules:

- Return a score between 0 and 100.
- 0 means extremely poor ATS compatibility.
- 100 means excellent ATS compatibility.
- Be realistic and objective.
- Do not inflate the score.
- Deduct points for missing or weak sections.
- Consider both keyword usage and the quality of the resume.
- Do not invent information.
- Do not return anything except valid JSON.

Required JSON format:

{
  "atsScore": 85
}

Important:
- atsScore MUST be a number.
- atsScore MUST be between 0 and 100.
- Return ONLY the JSON object.
- Do not use markdown.
- Do not use code blocks.
- Do not include explanations.
`;

    const result = await generateAiResponse(prompt);

    if (typeof result !== "string" || !result.trim()) {
      console.error("Empty AI response:", result);

      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Invalid response received from AI",
          data: null,
        },
        { status: 502 }
      );
    }

    let atsResult: AtsScoreResult;

    try {
      atsResult = JSON.parse(result);
    } catch (error) {
      console.error("Invalid AI response:", result);

      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Invalid response received from AI",
          data: null,
        },
        { status: 502 }
      );
    }

    // Validate AI response
    if (
      typeof atsResult.atsScore !== "number" ||
      atsResult.atsScore < 0 ||
      atsResult.atsScore > 100
    ) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Invalid ATS score generated",
          data: null,
        },
        { status: 502 }
      );
    }

    return NextResponse.json<ApiResponse<AtsScoreResult>>(
      {
        success: true,
        message: "ATS score generated successfully",
        data: atsResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating ATS score:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to generate ATS score",
        data: null,
      },
      { status: 500 }
    );
  }
}