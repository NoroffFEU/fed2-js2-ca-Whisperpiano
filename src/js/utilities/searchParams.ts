/**
 * Retrieves the value of a specific query parameter from the URL.
 *
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string | null} The value of the query parameter, or `null` if not found.
 */

export function searchParams(param: string): string | null {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get(param);
}
