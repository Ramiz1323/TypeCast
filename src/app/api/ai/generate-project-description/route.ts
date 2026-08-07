import { generateAiResponse } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateProjectDescriptionBody = await req.json();
        const { experienceLevel, projectName, projectTitle, projectType, role, technologies } = body;

        if (!experienceLevel || !projectName || !projectTitle || !projectType || !role || !technologies) {
            return NextResponse.json<ApiResponse<null>>({
                success: false,
                message: "Please provide all the required fields"
            }, { status: 400 });
        }

        const prompt = `
        You are an expert resume writer and ATS optimization specialist.
        
        Generate a professional ATS-friendly project description using the details below.
        
        Project Name:
        ${projectName}
        
        Project Title:
        ${projectTitle}
        
        Project Type:
        ${projectType}
        
        Role:
        ${role}
        
        Technologies:
        ${technologies}
        
        Experience Level:
        ${experienceLevel}
        
        Rules:
        1. Write ONLY the project description.
        2. The description MUST be between 80 and 120 words.
        3. Do not generate headings, titles, labels, bullet points, numbering, markdown, or explanations.
        4. Naturally incorporate the provided job role and tech stack.
        5. Use ATS-friendly keywords relevant to the role and technologies.
        6. Highlight project objectives, responsibilities, and technical contributions.
        7. Adapt the content based on experience level:
           - Fresher: focus on academic projects, learning ability, and foundational technical skills.
           - Mid-Level: focus on practical project work, ownership, and measurable contributions.
           - Senior-Level: focus on leadership, strategy, mentoring, and business impact.
        8. Avoid generic phrases such as "hardworking", "team player", or "seeking opportunities".
        9. Do not use first-person pronouns (I, me, my).
        10. Ensure the description is concise, impactful, professional, and tailored to the provided role.
        11. Optimize for ATS systems while maintaining natural readability.
        12. Return plain text only.
        13. The final output must contain a minimum of 80 words and a maximum of 120 words.
        
        Output:
        Return only the project description text.
        `;

        const result = await generateAiResponse(prompt);

        const projectDescription = result;

        return NextResponse.json<ApiResponse<string>>({
            success: true,
            message: "Project description generated successfully",
            data: projectDescription
        }, { status: 201 });

    } catch (error) {
        console.error("Error generating project description", error);
        return NextResponse.json<ApiResponse<null>>({
            success: false,
            message: "Failed to generate project description"
        }, { status: 500 });
    }
}
