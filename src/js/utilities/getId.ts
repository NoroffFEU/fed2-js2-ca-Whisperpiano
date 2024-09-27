/**
 * Retrieves the post ID from the URL.
 * @returns The post ID.
 */

export function getId() {
  return Number(new URLSearchParams(window.location.search).get("id"));
}
