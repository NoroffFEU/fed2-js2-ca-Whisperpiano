import { API_KEY } from "@api/constants";

export function headers(userToken: string) {
  return {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(userToken && { Authorization: `Bearer ${userToken}` }),
  };
}
