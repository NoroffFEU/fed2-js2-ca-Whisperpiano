/**
 * Checks if the file type is valid.
 * @param e The event object.
 */

export function checkValidTypes(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  const validTypes = ["image/jpeg", "image/png"];

  if (!validTypes.includes(file.type)) {
    alert("Please upload a valid image file.");
    input.value = "";
  }
}
