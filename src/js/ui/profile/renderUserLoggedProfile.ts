import { getUser } from "@/js/utilities/getUser";
import { readProfile } from "@/js/api/profile/read";
import { UserLoggedProfile } from "@/components/profile/UserLoggedProfile";

export async function loadUserLoggedProfile() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/login/" ||
    window.location.pathname === "/register/" ||
    window.location.pathname === "/404/"
  ) {
    return;
  }

  const user = getUser();
  const profileContainer = document.querySelector(
    ".profile__container"
  ) as HTMLElement;

  if (!customElements.get("user-logged-profile")) {
    customElements.define("user-logged-profile", UserLoggedProfile);
  }

  const profileData = await readProfile(user);

  if (profileData) {
    const profile = document.createElement(
      "user-logged-profile"
    ) as UserLoggedProfile;
    profile.data = profileData;
    profileContainer.append(profile);
  }
}
