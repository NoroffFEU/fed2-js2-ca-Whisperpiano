import { login } from "@api/auth/login";
import { APILoginRequest } from "@/types/types";

export async function onLogin(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);
  const { email, password } = userData;

  try {
    await login({ email, password } as APILoginRequest);
    if (localStorage.token) {
      window.location.href = "/home/";
    }
  } catch (error) {
    console.error(error);
  }
}
