import { readProfile } from "../api/profile/read";
import { getUser } from "./getUser";

/**
 * Retrieves the user's logged profile data.
 * @returns {object} The user's profile data.
 */

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
