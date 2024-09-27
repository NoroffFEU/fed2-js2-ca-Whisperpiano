// Function to get post id from the URL

export function getId() {
  return Number(new URLSearchParams(window.location.search).get("id"));
}
