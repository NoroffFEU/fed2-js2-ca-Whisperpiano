// Function to get user logged name

/**
 * Retrieves the user's logged name.
 * @returns {string} The user's logged name.
 */

export function getUser() {
  return localStorage.getItem("userName") as string;
}
