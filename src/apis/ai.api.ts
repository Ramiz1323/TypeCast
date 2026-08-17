import axios from "axios";
import {
    GenerateSummaryBody,
    GenerateSkillsBody,
    GenerateProjectDescriptionBody,
    GenerateExperienceDescriptionBody,
    ImproveContentBody,
    AtsScoreBody,
    AtsScoreResult,
} from "@/types/ai.types";

// Generate resume summary
export const generateSummaryApi = async (payload: GenerateSummaryBody) => {
    const response = await axios.post<string>("/api/ai/generate-summary", payload);
    return response.data;
};

// Generate skills section
export const generateSkillsApi = async (payload: GenerateSkillsBody) => {
    const response = await axios.post<string>("/api/ai/generate-skills", payload);
    return response.data;
};

// Generate project description
export const generateProjectDescriptionApi = async (
    payload: GenerateProjectDescriptionBody
) => {
    const response = await axios.post<string>(
        "/api/ai/generate-project-description",
        payload
    );
    return response.data;
};

// Generate experience description
export const generateExperienceDescriptionApi = async (
    payload: GenerateExperienceDescriptionBody
) => {
    const response = await axios.post<string>(
        "/api/ai/generate-experience-description",
        payload
    );
    return response.data;
};

// Improve content
export const improveContentApi = async (payload: ImproveContentBody) => {
    const response = await axios.post<string>("/api/ai/improve-content", payload);
    return response.data;
};

// ATS Score
export const atsScoreApi = async (
    payload: AtsScoreBody
): Promise<AtsScoreResult> => {
    const response = await axios.post<AtsScoreResult>(
        "/api/ai/ats-score",
        payload
    );
    return response.data;
};
