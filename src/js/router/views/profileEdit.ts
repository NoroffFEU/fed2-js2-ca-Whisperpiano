import { readProfile } from "@/js/api/profile/read";
import { getUser } from "@/js/utilities/getUser";
import { onUpdateProfile } from "@/js/ui/profile/update";
import { checkValidTypes } from "@utilities/checkValidTypes";

async function loadProfileEditPage() {
  try {
    setValidTypes();
    const editProfileForm = document.forms.namedItem("editProfile");

    if (editProfileForm instanceof HTMLFormElement) {
      editProfileForm.addEventListener("submit", onUpdateProfile);
    }

    populateBio();
  } catch (error) {
    console.error(error);
  }
}

function setValidTypes() {
  const avatarInput = document.querySelector(
    "#profile-avatar"
  ) as HTMLInputElement;
  const bannerInput = document.querySelector(
    "#profile-banner"
  ) as HTMLInputElement;

  if (
    !(avatarInput instanceof HTMLInputElement) ||
    !(bannerInput instanceof HTMLInputElement)
  )
    return;

  avatarInput.addEventListener("change", checkValidTypes);
  bannerInput.addEventListener("change", checkValidTypes);
}

async function populateBio() {
  const bioInput = document.querySelector("#bio") as HTMLTextAreaElement;

  const user = getUser();
  try {
    const userProfile = await readProfile(user);
    if (userProfile) {
      bioInput.value = userProfile.bio;
    }
  } catch (error) {
    console.error(error);
  }
}

loadProfileEditPage();
