import { PostID, APIError } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function deletePost(postId: PostID) {
  try {
    const response = await fetch(`${API_SOCIAL.POSTS}/${postId}`, {
      method: "DELETE",
      headers: headers(localStorage.token),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message ||
        `Something went wrong deleting the post with id: ${postId}.`;
      throw new Error(errorMessage);
    }
    return response.ok;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(postId: number, commentId: number) {
  try {
    const response = await fetch(
      `${API_SOCIAL.POSTS}/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message ||
        `Something went wrong deleting the comment with id: ${commentId}.`;
      throw new Error(errorMessage);
    }
    return response.ok;
  } catch (error) {
    console.error(error);
  }
}
