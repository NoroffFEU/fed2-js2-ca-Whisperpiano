import router from "@router/index";
import { loadLogo } from "@/components/Logo";
import { loadSearchInput } from "@ui/search/searchInputLoader";
import { loadLogoutButton } from "@/components/buttons/LogoutButton";
import { loadUserLoggedProfile } from "@ui/profile/renderUserLoggedProfile";
import { authGuard } from "@utilities/authGuard";

async function loadApp() {
  authGuard();
  await router(window.location.pathname);
  await loadUserLoggedProfile();
  loadLogo();
  loadSearchInput();
  loadLogoutButton();
}

loadApp();
