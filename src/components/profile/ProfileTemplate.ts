import { ProfileResponse } from "@/types/types";
import { FollowButton } from "@/components/buttons/FollowButton";
import { EditProfile } from "@/components/buttons/EditProfile";
import { createPostHTML } from "../cards/PostCardTemplate";
import { readPost } from "@/js/api/post/read";
import { getUser } from "@/js/utilities/getUser";

export async function createProfileHTML(
  profile: ProfileResponse,
  isFollowing: boolean,
  isUserProfile: boolean
) {
  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }

  if (!customElements.get("edit-profile")) {
    customElements.define("edit-profile", EditProfile);
  }

  const postsFromUser = profile.posts;
  const slicedPosts =
    postsFromUser.length > 3 ? postsFromUser.slice(0, 3) : postsFromUser;

  const postsHTML = slicedPosts
    ? (
        await Promise.all(
          slicedPosts.map(async (post) => {
            const getPost = await readPost(post.id);
            if (!getPost) return "";
            const isLiked = getPost.reactions[0]?.reactors.find(
              (user) => user === getUser()
            )
              ? true
              : false;

            return createPostHTML(getPost, isFollowing, isLiked, true, false);
          })
        )
      ).join("")
    : "";

  return `
  <div class="profile__container">
    <div class="profile__header">
        <div class="profile__header__banner">
            <img 
                class="profile__banner" 
                src="${profile.banner.url}" 
                alt="${profile.banner.alt || `${profile.name} banner`}"
            />
        </div>
        <div class="profile__avatar__container">
            <div>
                <img 
                    class="profile__avatar"
                    src="${profile.avatar.url}" 
                    alt="${profile.avatar.alt || `${profile.name} avatar`}"
                >
            </div>

            <div class="follow-button-container">
                  ${
                    !isUserProfile
                      ? `<follow-button 
                            data-user-name="${profile.name}" 
                            data-is-following="${isFollowing}"
                        ></follow-button>
                        `
                      : `<edit-profile data-user-name="${profile.name}">Edit profile</edit-profile>`
                  }
            </div>
        </div>
        <div class="profile__nickname">
            <span>${profile.name}</span>
            <span>@${profile.name}</span>
        </div>
    </div>

    <div class="profile__header__stats">
        <div>
            <p><i>${profile.bio || "<i>User has no bio.</i>"}</i></p>
        </div>

        <div>
            <p><strong>Following:</strong> <span>${
              profile._count.following
            }</span></p>
            <p><strong>Followers:</strong> <span class="followers">${
              profile._count.followers
            }</span></p>
            <p><strong>Posts:</strong> <span>${profile._count.posts}</span></p>
        </div>
    </div>

    <hr>
    <div class="posts__title">
        <span>⬇️ Latest posts</span>
    </div>
    <hr>

    <div class="profile__posts">
      <ul>
      ${postsHTML ? postsHTML : "<li><i>No posts yet</i></li>"} 
      </ul>
    </div>
  </div>
  `;
}
