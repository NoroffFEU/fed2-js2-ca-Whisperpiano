import { readPost } from "@/js/api/post/read";
import { getUser } from "@/js/utilities/getUser";

// Function to check if the user is the creator of a post

export async function creatorLiked(id: number): Promise<boolean> {
  const post = await readPost(id);
  return (
    post?.reactions[0]?.reactors?.some((user) => user === getUser()) || false
  );
}
