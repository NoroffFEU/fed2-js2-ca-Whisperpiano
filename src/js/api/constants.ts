import { APIAuthEndpoints, APISocialEndpoints } from "@/types/types";

export const API_KEY: string = import.meta.env.VITE_API_KEY;

export const API_BASE: string = "https://v2.api.noroff.dev";

export const API_AUTH: APIAuthEndpoints = {
  BASE: `${API_BASE}/auth`,
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  CREATE_API_KEY: `${API_BASE}/auth/create-api-key`,
};

export const API_SOCIAL: APISocialEndpoints = {
  BASE: `${API_BASE}/social`,
  POSTS: `${API_BASE}/social/posts`,
  PROFILES: `${API_BASE}/social/profiles`,
};
