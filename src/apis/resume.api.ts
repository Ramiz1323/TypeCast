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
 * Get all resumes for a specific user
 */
export const getResumesApi = async (userId: string) => {
  const response = await axios.get<IResume[]>(`/api/resumes?userId=${userId}`);
  return response.data;
};

/**
 * Get a single resume by ID
 */
export const getResumeByIdApi = async (resumeId: string) => {
  const response = await axios.get<IResume>(`/api/resumes/${resumeId}`);
  return response.data;
};

/**
 * Update an existing resume
 */
export const updateResumeApi = async (
  resumeId: string,
  payload: Partial<IResume>
) => {
  const response = await axios.put<IResume>(`/api/resumes/${resumeId}`, payload);
  return response.data;
};

/**
 * Delete a resume
 */
export const deleteResumeApi = async (resumeId: string) => {
  const response = await axios.delete<{ success: boolean }>(
    `/api/resumes/${resumeId}`
  );
  return response.data;
};
