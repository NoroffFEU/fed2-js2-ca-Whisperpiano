// This component is a button that allows the user to like or unlike a post

import { reactToPost } from "@/js/api/post/react";

const likeButtonTemplate = document.createElement("template");

likeButtonTemplate.innerHTML = `
  <style>
    button {
        color: #333;
        border: 1px solid #ccc;
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.25rem 0.65rem;
        border-radius: 0.65rem;
        transition: all 0.2s ease-in-out; cursor: pointer; 
    }
    button.liked { background: lightgreen; }
  </style>
  <button>
    <slot></slot>
  </button>
`;

export class LikeButton extends HTMLElement {
  private isProcessing: boolean = false;
  reactions: number;
  userLiked: boolean;
  postId: number;

  constructor() {
    super();
    this.reactions = Number(this.getAttribute("data-reactions")) || 0;
    this.userLiked = this.getAttribute("data-user-liked") === "true";
    this.postId = Number(this.getAttribute("data-post-id"));

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(likeButtonTemplate.content.cloneNode(true));
    }

    this.renderButton();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleLike);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleLike);
  }

  handleLike = async () => {
    if (this.isProcessing) return;

    this.isProcessing = true;
    try {
      await reactToPost(this.postId, "👍");
      this.toggleLikeState();
      this.renderButton();
    } catch (error) {
      console.error("Error processing like:", error);
    } finally {
      this.isProcessing = false;
    }
  };

  toggleLikeState() {
    this.userLiked = !this.userLiked;
    this.reactions = this.userLiked ? this.reactions + 1 : this.reactions - 1;
    this.updateAttributes();
  }

  updateAttributes() {
    this.setAttribute("data-user-liked", this.userLiked.toString());
    this.setAttribute("data-reactions", this.reactions.toString());
  }

  renderButton() {
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      button.classList.toggle("liked", this.userLiked);
    }
    this.textContent = `${this.reactions} | 👍`;
  }
}

customElements.define("like-button", LikeButton);
