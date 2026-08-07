import { generateAiResponse } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateSkillsBody = await req.json();
        const { experienceLevel, jobTitle } = body;

        if (!experienceLevel || !jobTitle) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "Please provide all the required fields"
            }, { status: 400 });
        }

        const prompt = `
        You are an expert resume writer and ATS optimization specialist.
        
        Generate a professional ATS-friendly skills section using the details below.
        
        Job Title:
        ${jobTitle}
        
        Experience Level:
        ${experienceLevel}
        
        Rules:
        1. Write ONLY the skills section.
        2. Provide 8–12 skills relevant to the role.
        3. Do not generate headings, titles, labels, bullet points, numbering, markdown, or explanations.
        4. Naturally incorporate both technical and soft skills aligned with the job title.
        5. Use ATS-friendly keywords that employers and recruiters search for.
        6. Adapt the skills based on experience level:
           - Fresher: focus on academic projects, foundational technical skills, and learning ability.
           - Mid-Level: focus on practical expertise, tools, frameworks, and contributions.
           - Senior-Level: focus on leadership, strategy, advanced technical expertise, and mentoring.
        7. Avoid generic or vague terms such as "hardworking" or "team player".
        8. Return plain text only.
        
        Output:
        Return only the skills list as plain text, separated by commas.
        `;

        const result = await generateAiResponse(prompt);

        const skills = result;

        return NextResponse.json<ApiResponse<string>>({
            success: true,
            message: "Skills generated successfully",
            data: skills
        }, { status: 201 });

    } catch (error) {
        console.error("Error generating skills", error);
        return NextResponse.json<ApiResponse<null>>({
            success: false,
            message: "Failed to generate skills"
        }, { status: 500 });
    }
}
