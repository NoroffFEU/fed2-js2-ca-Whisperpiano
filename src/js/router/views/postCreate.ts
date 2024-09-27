import { onCreatePost } from "@ui/post/create";
import { findForm } from "@utilities/findForm";
import { checkValidTypes } from "@utilities/checkValidTypes";

function loadPostCreatePage() {
  setValidTypes();
  const createPostForm = findForm("createPost");
  if (createPostForm instanceof HTMLFormElement) {
    const formTitleInput = createPostForm.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    formTitleInput.focus();
    createPostForm.addEventListener("submit", onCreatePost);
  }
}

function setValidTypes() {
  const input = document.querySelector(
    "input[type='file']"
  ) as HTMLInputElement;

  if (!(input instanceof HTMLInputElement)) return;

  input.addEventListener("change", checkValidTypes);
}

loadPostCreatePage();
