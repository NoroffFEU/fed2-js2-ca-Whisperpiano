// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("@/js/router/views/auth");
      break;
    case "/home/":
      await import("@/js/router/views/home");
      break;
    case "/login/":
      await import("@/js/router/views/login");
      break;
    case "/register/":
      await import("@/js/router/views/register");
      break;
    case "/post/":
      await import("@/js/router/views/post");
      break;
    case "/post/edit/":
      await import("@/js/router/views/postEdit");
      break;
    case "/post/create/":
      await import("@/js/router/views/postCreate");
      break;
    case "/profile/":
      await import("@/js/router/views/profile");
      break;
    case "/profile/edit/":
      await import("@/js/router/views/profileEdit");
      break;
    case "/explore/":
      await import("@/js/router/views/explore");
      break;
    case "/search/":
      await import("@/js/router/views/search");
      break;
    case "/404/":
      await import("@/js/router/views/notFound");
      break;
    default:
      await import("@/js/router/views/notFound");
  }
}
