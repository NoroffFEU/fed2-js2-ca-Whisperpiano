import { readProfile } from "../api/profile/read";
import { getUser } from "./getUser";

// Function to get user logged profile data

export async function getUserProfile() {
  const user = getUser();
  try {
    const userProfile = await readProfile(user);
    if (!userProfile) throw new Error("User profile not found");
    return userProfile.following;
  } catch (error) {
    console.error(error);
  }
}
