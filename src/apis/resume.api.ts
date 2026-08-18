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
 * Get all resumes
 */
export const getAllResumesApi = async () => {
  const response = await axios.get<IResume[]>("/api/resumes");
  return response.data;
};

/**
 * Get resume by id
 */
export const getResumeByIdApi = async (resumeId: string) => {
  const response = await axios.get<IResume>(`/api/resumes/${resumeId}`);
  return response.data;
};

/**
 * Update an existing resume by id
 */
export const updateResumeApi = async (resumeId: string, payload: IResume) => {
  const response = await axios.put<IResume>(`/api/resumes/${resumeId}`, payload);
  return response.data;
};

/**
 * Delete a resume by id
 */
export const deleteResumeApi = async (resumeId: string) => {
  const response = await axios.delete<{ success: boolean; message: string }>(
    `/api/resumes/${resumeId}`
  );
  return response.data;
};