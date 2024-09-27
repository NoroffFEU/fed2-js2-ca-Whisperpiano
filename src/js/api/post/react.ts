import { getUser } from "@/js/utilities/getUser";
import { APIError, ReactionResponse } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function reactToPost(id: number, symbol: string) {
  try {
    const response = await fetch(`${API_SOCIAL.POSTS}/${id}/react/${symbol}`, {
      method: "PUT",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        symbol,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reacting to the post.";
      throw new Error(errorMessage);
    }

    const { data }: { data?: ReactionResponse } = await response.json();
    if (!data || !data.reactions || data.reactions.length === 0) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
