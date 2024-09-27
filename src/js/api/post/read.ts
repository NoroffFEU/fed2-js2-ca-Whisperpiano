import { PostID, APIError, PostResponse, Params, Meta } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function readPost(id: PostID) {
  try {
    const response = await fetch(
      `${API_SOCIAL.POSTS}/${id}?_author=true&_comments=true&_reactions=true`,
      {
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the post.";
      throw new Error(errorMessage);
    }

    const { data }: { data: PostResponse } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function readPosts({ limit = 12, page = 1, tag }: Params = {}) {
  try {
    const response = await fetch(
      `${
        API_SOCIAL.POSTS
      }/?limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true${
        tag ? `&_tag=${tag}` : ""
      }`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );
    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the posts.";
      throw new Error(errorMessage);
    }

    const { data, meta }: { data: PostResponse[]; meta: Meta } =
      await response.json();
    return { data, meta };
  } catch (error) {
    console.error(error);
  }
}

export async function readPostsByUser(
  username: string,
  { limit = 12, page = 1 }: Params = {}
) {
  try {
    const response = await fetch(
      `${API_SOCIAL.PROFILES}/${username}/posts?limit=${limit}&page=${page}&_author=true&_followers=true&_comments=true&_reactions=true`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the posts.";
      throw new Error(errorMessage);
    }
    const { data }: { data: PostResponse[] } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function readPostsFromFollowing() {
  try {
    const response = await fetch(
      `${API_SOCIAL.POSTS}/following?_author=true&_followers=true&_comments=true&_reactions=true`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the posts.";
      throw new Error(errorMessage);
    }
    const { data }: { data: PostResponse[] } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
