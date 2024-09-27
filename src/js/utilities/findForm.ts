import { FormNames } from "@/types/types";

/**
 * Finds a form by name.
 *
 * @param {FormNames} formName - The name of the form to find.
 * @returns The form element.
 */

export function findForm(formName: FormNames) {
  const form = document.forms.namedItem(formName);
  return form;
}
