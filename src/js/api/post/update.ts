import {
  APIError,
  PostID,
  UpdatePostRequest,
  PostResponse,
} from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function updatePost(
  id: PostID,
  { title, body, tags, media }: UpdatePostRequest
) {
  try {
    const response = await fetch(`${API_SOCIAL.POSTS}/${id}`, {
      method: "PUT",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        title,
        body,
        tags,
        media,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong updating the post.";
      throw new Error(errorMessage);
    }

    const { data }: { data: PostResponse } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
