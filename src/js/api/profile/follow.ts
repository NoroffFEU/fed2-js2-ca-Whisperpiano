import { APIError, FollowResponse, ToggleFollow } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function toggleFollowUser(username: string, action: ToggleFollow) {
  try {
    const response = await fetch(
      `${API_SOCIAL.PROFILES}/${username}/${action}`,
      {
        method: "PUT",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || `Something went wrong ${action}ing the user.`;
      throw new Error(errorMessage);
    }

    const { data }: { data: FollowResponse } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
