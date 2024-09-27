import { searchParams } from "@/js/utilities/searchParams";
import { readPost } from "@/js/api/post/read";
import { createPostHTML } from "@/components/cards/PostCardTemplate";
import { getUser } from "@/js/utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";

function loadPostPage() {
  try {
    getPostToRender();
  } catch (error) {
    console.error(error);
  }
}

export async function getPostToRender() {
  const postContainer = document.querySelector("#posts") as HTMLElement;

  const postId = Number(searchParams("id"));

  const post = await readPost(postId);

  if (!post) {
    console.log("No post found");
    return;
  }

  const getFollowingUsers = await getUserProfile();

  const isFollowing = getFollowingUsers?.find(
    (user) => user.name === post.author.name
  )
    ? true
    : false;

  const isLiked = post.reactions[0]?.reactors.find((user) => user === getUser())
    ? true
    : false;

  const isUserPost = post.author.name === getUser() ? true : false;

  const postHTML = await createPostHTML(
    post,
    isFollowing,
    isLiked,
    isUserPost,
    true
  );
  postContainer.insertAdjacentHTML("beforeend", postHTML);
}

loadPostPage();
