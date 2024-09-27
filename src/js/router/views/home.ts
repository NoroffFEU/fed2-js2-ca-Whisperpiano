import { readPostsByUser, readPostsFromFollowing } from "@api/post/read";
import { getUser } from "@utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { createPostHTML } from "@/components/cards/PostCardTemplate";
import { creatorLiked } from "@/js/utilities/checkIfCreatorLiked";

let page = 1;
let isLoading = false;
let isLastPage = false;

async function loadHomePage() {
  try {
    renderPosts(page);
    loadPagination();
  } catch (error) {
    console.error(error);
  }
}

export async function renderPosts(page: number) {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const user = getUser();
  const postsByUser = (await readPostsByUser(user)) || [];
  const postsFromFollowing = (await readPostsFromFollowing()) || [];

  const combinedPosts = [...postsByUser, ...postsFromFollowing];
  const orderedPosts = combinedPosts.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  const postsPerPage = 12;
  const start = (page - 1) * postsPerPage;
  const end = page * postsPerPage;

  const postsToRender = orderedPosts.slice(start, end);

  isLastPage = postsToRender.length < postsPerPage;

  const getFollowingUsers = await getUserProfile();

  try {
    if (!postsToRender || postsToRender.length === 0) {
      if (page === 1) {
        const li = document.createElement("li");
        li.innerHTML =
          "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
        postsContainer.appendChild(li);
      }
    } else {
      for (const post of postsToRender) {
        const isFollowing = getFollowingUsers?.find(
          (user) => user.name === post.author.name
        )
          ? true
          : false;

        const isUserPost = post.author.name === getUser() ? true : false;

        const test = isUserPost ? await creatorLiked(post.id) : false;

        const isLiked = post.reactions[0]?.reactors?.find(
          (user) => user === getUser()
        )
          ? true
          : false;

        const postHTML = createPostHTML(
          post,
          isFollowing,
          isLiked || test,
          isUserPost,
          false
        );
        postsContainer.insertAdjacentHTML("beforeend", postHTML);
      }
    }
  } catch (error) {
    console.error(error);
    const li = document.createElement("li");
    li.innerHTML =
      "Your home timeline is empty! Create a post to get started, or follow some users to see their posts";
    postsContainer.appendChild(li);
  }
}

async function loadPagination() {
  const scrollSection = document.querySelector(
    ".scroll-section"
  ) as HTMLElement;

  scrollSection.addEventListener("scroll", async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      !isLastPage
    ) {
      isLoading = true;
      page += 1;
      console.log(`Loading page ${page}...`);

      await renderPosts(page);

      isLoading = false;
    }
  });
}

loadHomePage();
