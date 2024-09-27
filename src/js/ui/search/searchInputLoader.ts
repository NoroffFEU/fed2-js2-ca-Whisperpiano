/**
 * Loads the search input for the search page.
 */

export function loadSearchInput() {
  const form = document.forms.namedItem("search");
  if (!form) return;

  const searchInput = form.elements.namedItem("search") as HTMLInputElement;
  if (!searchInput) return;

  form.addEventListener("submit", (e) =>
    searchInputListener(e, searchInput.value)
  );
}

/**
 * Handles the search input submission.
 * @param e The event object.
 * @param value The search query.
 */

function searchInputListener(e: Event, value: string) {
  e.preventDefault();
  window.location.href = `/search/?q=${value}`;
}
