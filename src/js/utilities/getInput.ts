/**
 * Retrieves an input element from a form.
 *
 * @param {HTMLFormElement} formName - The form element to search in.
 * @param {string} inputName - The name of the input element to retrieve.
 * @returns {HTMLInputElement} The input element.
 */

export function getInput(
  formName: HTMLFormElement,
  inputName: string
): HTMLInputElement {
  return formName.elements.namedItem(inputName) as HTMLInputElement;
}
