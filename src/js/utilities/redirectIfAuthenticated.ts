// Function to redirect to home page if user is authenticated

export function redirectIfAuthenticated() {
  if (localStorage.token) {
    window.location.href = "/home/";
  }
}
