/**
 * Redirects the user to the home page if they are authenticated.
 */

export function redirectIfAuthenticated() {
  if (localStorage.token) {
    window.location.href = "/home/";
  }
}
