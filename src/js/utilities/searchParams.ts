export function searchParams(param: string) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get(param);
}
