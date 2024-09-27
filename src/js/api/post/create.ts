import {
  CreatePostRequest,
  APIError,
  PostResponse,
  CommentResponse,
  CommentRequest,
} from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function createPost({
  title,
  body,
  tags,
  media,
}: CreatePostRequest) {
  try {
    const response = await fetch(`${API_SOCIAL.POSTS}`, {
      method: "POST",
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
        errors?.[0]?.message || "Something went wrong creating the post.";
      throw new Error(errorMessage);
    }
    const { data }: { data: PostResponse } = await response.json();

    if (!data) {
      throw new Error("Error creating post");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createComment({ body, id, replyToId }: CommentRequest) {
  try {
    const response = await fetch(`${API_SOCIAL.POSTS}/${id}/comment`, {
      method: "POST",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        body,
        replyToId,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong creating the comment.";
      throw new Error(errorMessage);
    }
    const { data }: { data: CommentResponse } = await response.json();

    if (!data) {
      throw new Error("Error creating comment");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
