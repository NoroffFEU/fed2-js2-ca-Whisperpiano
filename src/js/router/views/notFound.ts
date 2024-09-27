export function loadNotFoundPage() {
  if (window.location.pathname === "/404/") {
    return;
  }
  alert(
    `We are sorry but the page you are looking for does not exist. Redirecting to error page.`
  );
  window.location.href = "/404/";
}

loadNotFoundPage();
