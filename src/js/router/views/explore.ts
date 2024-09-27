import { readPosts } from "@/js/api/post/read";
import { AllPostsResponse, Meta } from "@/types/types";
import { getUser } from "@/js/utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { createPostHTML } from "@/components/cards/PostCardTemplate";

let page = 1;
let isLoading = false;
let isLastPage = false;

async function loadExplorePage() {
  try {
    renderAllPosts();
    loadPagination();
  } catch (error) {
    console.error(error);
  }
}

export async function renderAllPosts() {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const getAllPosts = (await readPosts({ page: page })) as AllPostsResponse;

  const { data, meta } = getAllPosts;

  const getFollowingUsers = await getUserProfile();

  isLastPage = meta.isLastPage;

  if (!data || data.length === 0) {
    postsContainer.innerHTML = "No posts found";
  } else {
    data.forEach(async (post) => {
      const isFollowing = getFollowingUsers?.find(
        (user) => user.name === post.author.name
      )
        ? true
        : false;

      const isLiked = post.reactions[0]?.reactors.find(
        (user) => user === getUser()
      )
        ? true
        : false;

      const isUserPost = post.author.name === getUser() ? true : false;

      const postHTML = createPostHTML(
        post,
        isFollowing,
        isLiked,
        isUserPost,
        false
      );
      postsContainer.insertAdjacentHTML("beforeend", postHTML);
    });

    if (meta.nextPage !== null) {
      page = meta.nextPage;
    }
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
      console.log(`Loading page ${page}...`);

      await renderAllPosts();

      isLoading = false;
    }
  });
}

loadExplorePage();
