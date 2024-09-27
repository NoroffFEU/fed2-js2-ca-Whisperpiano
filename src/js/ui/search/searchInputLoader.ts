export function loadSearchInput() {
  const form = document.forms.namedItem("search");
  if (!form) return;

  const searchInput = form.elements.namedItem("search") as HTMLInputElement;
  if (!searchInput) return;

  form.addEventListener("submit", (e) =>
    searchInputListener(e, searchInput.value)
  );
}

function searchInputListener(e: Event, value: string) {
  e.preventDefault();
  window.location.href = `/search/?q=${value}`;
}
