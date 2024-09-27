// Function to get an input element from a form

export function getInput(
  formName: HTMLFormElement,
  inputName: string
): HTMLInputElement {
  return formName.elements.namedItem(inputName) as HTMLInputElement;
}
