import { redirectIfAuthenticated } from "@utilities/redirectIfAuthenticated";
import { findForm } from "@utilities/findForm";
import { onRegister } from "@ui/auth/register";

async function loadRegisterPage() {
  redirectIfAuthenticated();

  const registerForm = findForm("register");

  if (registerForm instanceof HTMLFormElement) {
    registerForm.addEventListener("submit", onRegister);
  }
}

loadRegisterPage();
