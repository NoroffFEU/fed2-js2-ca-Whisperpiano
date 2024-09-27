import { APIError, Params, PostResponse } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function searchPosts(
  query: string,
  { limit = 12, page = 1 }: Params = {}
) {
  try {
    const response = await fetch(
      `${API_SOCIAL.POSTS}/search?q=${query}&limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong searching the posts.";
      throw new Error(errorMessage);
    }

    const { data }: { data: PostResponse[] } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
