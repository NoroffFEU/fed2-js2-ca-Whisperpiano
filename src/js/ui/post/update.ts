import { getId } from "@/js/utilities/getId";
import { updatePost } from "@api/post/update";
import { uploadImage } from "@/js/api/imgur/imgur";

export async function onUpdatePost(event: Event) {
  event.preventDefault();

  const createUpdatePostBtn = document.querySelector(
    ".create-update-post-btn"
  ) as HTMLButtonElement;

  createUpdatePostBtn.disabled = true;

  const postToUpdate = getId();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);

  const title = userData.title as string;
  const body = userData.body as string;
  const tags =
    (userData.tags as string)?.split(",").map((tag) => tag.trim()) || [];

  const mediaInput = form.elements.namedItem("media") as HTMLInputElement;
  const progressBar = document.querySelector(
    "#progress-bar"
  ) as HTMLProgressElement;

  let media: { url: string; alt: string } | undefined = undefined;

  progressBar.style.display = "block";
  progressBar.value = 0;

  if (mediaInput.files && mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    try {
      progressBar.value = 25;
      const mediaUrl = await uploadImage(file);

      if (!mediaUrl) {
        throw new Error("Error uploading image");
      }

      const altText = `Image for post titled: ${title}`;
      media = { url: mediaUrl, alt: altText };
      progressBar.value = 50;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an issue uploading the image. Please try again.");
      progressBar.value = 0;
      progressBar.style.display = "none";
      createUpdatePostBtn.disabled = false;
      return;
    }
  }

  let postId: number | undefined = undefined;

  try {
    progressBar.value = 75;
    const postUpdated = await updatePost(postToUpdate, {
      title,
      body,
      tags,
      media,
    });

    if (postUpdated) {
      postId = postUpdated.id;
    }

    alert("Post updated successfully!");

    if (postId) {
      window.location.assign(`/post/?id=${postId}`);
    }
  } catch (error) {
    console.error(error);
    alert("There was an issue updating the post. Please try again.");
  } finally {
    progressBar.value = 100;
    progressBar.style.display = "none";
    createUpdatePostBtn.disabled = false;
  }
}
