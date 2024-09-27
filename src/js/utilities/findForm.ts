import { FormNames } from "@/types/types";

// Function to find a form by name

export function findForm(formName: FormNames) {
  const form = document.forms.namedItem(formName);
  return form;
}
