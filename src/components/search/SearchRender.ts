import { ProfileResponse } from "@/types/types";
import { ProfileSearch } from "@/components/search/ProfileSearch";
import { FollowButton } from "@/components/buttons/FollowButton";

export function createSearchHTML(
  profile: ProfileResponse,
  isFollowing: boolean,
  isUserProfile: boolean
) {
  if (!customElements.get("profile-search")) {
    customElements.define("profile-search", ProfileSearch);
  }
  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }
  return `
          <profile-search 
            data-username="${profile.name}" 
            data-followers="${profile._count.followers}"
            data-avatar-url="${profile.avatar.url}" 
            data-is-following="${isFollowing}"
            data-is-user-post="${isUserProfile}"
            >
          </profile-search>
    `;
}
