import { findForm } from "@/js/utilities/findForm";
import { redirectIfAuthenticated } from "@utilities/redirectIfAuthenticated";
import { onLogin } from "@ui/auth/login";

async function loadLoginPage() {
  redirectIfAuthenticated();

  const loginForm = findForm("login");

  if (loginForm instanceof HTMLFormElement) {
    loginForm.addEventListener("submit", onLogin);
  }
}

loadLoginPage();
