import { createProfileHTML } from "@/components/profile/ProfileTemplate";
import { searchParams } from "@/js/utilities/searchParams";
import { readProfile } from "@/js/api/profile/read";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { getUser } from "@/js/utilities/getUser";

async function loadProfilePage() {
  try {
    loadProfile();
  } catch (error) {
    console.error(error);
  }
}

async function loadProfile() {
  const profileContainer = document.querySelector("#posts") as HTMLUListElement;

  const username = searchParams("username") || "";

  const profile = await readProfile(username);

  const getFollowingUsers = await getUserProfile();

  if (!profile) {
    console.log("No profile found");
  } else {
    const isFollowing = getFollowingUsers?.find(
      (user) => user.name === username
    )
      ? true
      : false;

    const isUserProfile = username === getUser() ? true : false;

    const profileToRender = createProfileHTML(
      profile,
      isFollowing,
      isUserProfile
    );

    profileContainer.insertAdjacentHTML("beforeend", await profileToRender);
  }
}

loadProfilePage();
