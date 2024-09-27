import { readPost } from "@/js/api/post/read";
import { getUser } from "@/js/utilities/getUser";

/**
 * Checks if the user is the creator of a post.
 *
 * @param {number} id - The ID of the post to check.
 * @returns {boolean} Whether the user is the creator of the post.
 */

export async function creatorLiked(id: number): Promise<boolean> {
  const post = await readPost(id);
  return (
    post?.reactions[0]?.reactors?.some((user) => user === getUser()) || false
  );
}
