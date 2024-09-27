import { createSearchHTML } from "@/components/search/SearchRender";
import { searchProfiles } from "@/js/api/profile/search";
import { searchParams } from "@/js/utilities/searchParams";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { getUser } from "@/js/utilities/getUser";
import { SectionHeader } from "@/components/search/SectionHeader";
import { searchPosts } from "@/js/api/post/search";
import { createPostHTML } from "@/components/cards/PostCardTemplate";

async function loadSearchPage() {
  try {
    const query = searchParams("q");
    if (!query) return;
    renderSearch(query);
  } catch (error) {
    console.error(error);
  }
}

async function renderSearch(query: string) {
  const searchContainer = document.querySelector("#search") as HTMLElement;
  const getFollowingUsers = await getUserProfile();

  if (!customElements.get("section-header")) {
    customElements.define("section-header", SectionHeader);
  }

  try {
    const profiles = await searchProfiles(query, { limit: 5, page: 1 });

    if (profiles && profiles.length > 0) {
      const profilesSection = document.createElement("section");
      profilesSection.classList.add("profiles");

      const profilesSectionHeader = document.createElement("section-header");
      profilesSectionHeader.setAttribute("data-title", "profiles");
      profilesSection.appendChild(profilesSectionHeader);

      searchContainer.appendChild(profilesSection);
      profiles.forEach(async (profile) => {
        const isFollowing = getFollowingUsers?.find(
          (user) => user.name === profile.name
        )
          ? true
          : false;

        const isUserProfile = profile.name === getUser() ? true : false;

        const profileHTML = createSearchHTML(
          profile,
          isFollowing,
          isUserProfile
        );

        profilesSection.insertAdjacentHTML("beforeend", profileHTML);
      });
    }

    const posts = await searchPosts(query, { limit: 5, page: 1 });

    if (posts && posts.length > 0) {
      const postsSection = document.createElement("ul");
      postsSection.classList.add("posts");

      const postsSectionHeader = document.createElement("section-header");
      postsSectionHeader.setAttribute("data-title", "posts");
      postsSection.appendChild(postsSectionHeader);

      searchContainer.appendChild(postsSection);

      posts.forEach(async (post) => {
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

        postsSection.insertAdjacentHTML("beforeend", postHTML);
      });
    }
    if (
      (!profiles || profiles.length === 0) &&
      (!posts || posts.length === 0)
    ) {
      const div = document.createElement("div");
      div.innerHTML = "No results found";
      searchContainer.appendChild(div);
    }
  } catch (error) {
    console.error(error);
  }
}

loadSearchPage();
