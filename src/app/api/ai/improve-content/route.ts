import { generateAiResponse } from "@/lib/gemini";
import { ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();
    const { content } = body;

    // Validate request body
    if (!content || !content.trim()) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Please provide content to improve",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert resume writer and ATS optimization specialist.

Improve the following resume content to make it professional, concise, ATS-friendly, and impactful.

Original Content:
${content}

Rules:
1. Return ONLY the improved resume content.
2. Do not generate headings, titles, labels, bullet points, numbering, markdown, or explanations unless they already exist in the original content.
3. Preserve the original meaning and factual information.
4. Do not invent experience, skills, qualifications, achievements, metrics, or technologies.
5. Use strong ATS-friendly keywords where naturally appropriate.
6. Improve grammar, clarity, readability, and professional tone.
7. Remove unnecessary words and generic phrases.
8. Use action-oriented language where appropriate.
9. Keep the content concise and impactful.
10. Do not use first-person pronouns such as I, me, or my.
11. Do not add information that is not present in the original content.
12. Return plain text only.

Output:
Return only the improved resume content.
`;

    const result = await generateAiResponse(prompt);

    return NextResponse.json<ApiResponse<string>>(
      {
        success: true,
        message: "Content improved successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error improving resume content:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to improve resume content",
      },
      { status: 500 }
    );
  }
}