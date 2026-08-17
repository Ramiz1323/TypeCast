import axios from "axios";
import { IResume } from "@/types/resume.types";

/**
 * Create a new resume
 */
export const createResumeApi = async (payload: IResume) => {
  const response = await axios.post<IResume>("/api/resumes/create", payload);
  return response.data;
};

/**
 * Get all resume
 */
export const getAllResumesApi = async () => {
    const response = await axios.get<IResume[]>("/api/resumes");
    return response.data;
}

/**
 * Get resume by id
 */
export const getResumeByIdApi = async (resumeId: string) => {
    const response = await axios.get<IResume[]>(`/api/resumes/${resumeId}`);
    return response.data;
}