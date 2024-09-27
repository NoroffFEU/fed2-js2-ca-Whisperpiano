import { Media, APIError } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function updateProfile(
  username: string,
  { bio, avatar, banner }: { bio: string; avatar?: Media; banner?: Media }
) {
  try {
    const response = await fetch(`${API_SOCIAL.PROFILES}/${username}`, {
      method: "PUT",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        bio,
        avatar,
        banner,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong updating the profile.";
      throw new Error(errorMessage);
    }
    return response.ok;
  } catch (error) {
    console.error(error);
    return error;
  }
}
