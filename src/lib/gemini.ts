import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
}

const ai = new GoogleGenAI({
    apiKey: apiKey || ""
});

export async function generateAiResponse(prompt: string) {
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });
    return response.text;
}
