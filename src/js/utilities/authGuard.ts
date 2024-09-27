// Function to redirect to login page if user is not authenticated

export function authGuard() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/login/" ||
    window.location.pathname === "/register/"
  ) {
    return;
  }

  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/login/";
  }
}
