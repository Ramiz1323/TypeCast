import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const registerApi = async (payload: RegisterPayload) => {
  const response = await axios.post("/api/register", payload);
  return response.data;
};

export const loginApi = async (payload: LoginPayload) => {
  const response = await axios.post("/api/login", payload);
  return response.data;
};

export const getMeApi = async (): Promise<{ success: boolean; user: AuthUser }> => {
  const response = await axios.get<{ success: boolean; user: AuthUser }>("/api/auth/me");
  return response.data;
};

export const logoutApi = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};