// This component is a button that allows the user to delete a post

import { deletePost } from "@/js/api/post/delete";

const deleteButtonTemplate = document.createElement("template");

deleteButtonTemplate.innerHTML = `
  <style>
    button {
        background-color: var(--primary-color);
        color: var(--text-color-primary);
        border: 1px solid #ccc;
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.25rem 0.65rem;
        border-radius: 0.65rem;
        transition: all 0.2s ease-in-out; cursor: pointer; 
    }
    button:hover {
      background-color: var(--error-color);
      color: white;
    }
  </style>
  <button>
    <slot></slot>
  </button>
`;

export class DeleteButton extends HTMLElement {
  // Debouncing state
  private isProcessing: boolean = false;
  postId: number;
  isUserPost: boolean;

  constructor() {
    super();
    this.postId = Number(this.getAttribute("data-post-id"));
    this.isUserPost = this.getAttribute("data-is-user-post") === "true";

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot && this.isUserPost) {
      this.shadowRoot.appendChild(deleteButtonTemplate.content.cloneNode(true));
    }
  }
  connectedCallback() {
    this.addEventListener("click", this.handleDelete);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleDelete);
  }

  checkIfUlIsEmpty() {
    const postsContainer = document.getElementById("posts") as HTMLUListElement;
    if (
      postsContainer.children.length === 0 &&
      window.location.pathname === "/post/"
    ) {
      window.location.href = "/home/";
    } else if (postsContainer.children.length === 0) {
      const li = document.createElement("li");
      li.innerHTML =
        "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
      postsContainer.appendChild(li);
    }
  }

  async handleDelete() {
    try {
      const confirmed = confirm("Are you sure you want to delete this post?");
      if (confirmed && !this.isProcessing) {
        this.isProcessing = true;

        await deletePost(this.postId);

        const postElement = document.querySelector(
          `li[data-post-id='${this.postId}']`
        );

        if (postElement) {
          postElement.remove();
        }
      }
      this.checkIfUlIsEmpty();
    } catch (error) {
      console.error(error);
    } finally {
      this.isProcessing = false;
    }
  }
}

customElements.define("delete-button", DeleteButton);
