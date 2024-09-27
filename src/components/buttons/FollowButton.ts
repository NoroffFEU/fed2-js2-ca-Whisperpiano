// This component is a button that allows the user to follow or unfollow a user

import { toggleFollowUser } from "@api/profile/follow";

const followButtonTemplate = document.createElement("template");

followButtonTemplate.innerHTML = `
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
  button:hover {
    background-color: #28a745;
    color: white;
  }
  button.following { 
    background: #28a745;
    color: white;
  }
</style>

<button>
  <slot></slot>
</button>

`;

export class FollowButton extends HTMLElement {
  // Debouncing state
  private isProcessing: boolean = false;
  isUserPost: boolean;

  constructor() {
    super();
    this.isUserPost = this.getAttribute("data-is-user-post") === "true";

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot && !this.isUserPost) {
      this.shadowRoot.appendChild(followButtonTemplate.content.cloneNode(true));
    }
    this.addEventListener("click", (e) => this.handleFollow());
  }

  static get observedAttributes() {
    return ["data-is-following"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.updateButtonText(newValue);
  }

  async handleFollow() {
    // Prevent multiple clicks
    if (this.isProcessing) return;
    this.isProcessing = true;

    const userToFollow = this.getAttribute("data-user-name");
    const isFollowing = this.getAttribute("data-is-following");

    const followersSpan = document.querySelector(
      ".followers"
    ) as HTMLSpanElement;

    try {
      if (userToFollow) {
        if (isFollowing === "true") {
          if (followersSpan) {
            let followersValue = Number(followersSpan.textContent) - 1;
            followersSpan.innerText = followersValue.toString();
          }
          await toggleFollowUser(userToFollow, "unfollow");
          this.updateAllButtons(userToFollow, "false");
        } else if (isFollowing === "false") {
          if (followersSpan) {
            let followersValue = Number(followersSpan.textContent) + 1;
            followersSpan.innerText = followersValue.toString();
          }
          await toggleFollowUser(userToFollow, "follow");
          this.updateAllButtons(userToFollow, "true");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isProcessing = false;
    }
  }

  updateButtonText(isFollowing: string) {
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      if (isFollowing === "true") {
        button.textContent = "Unfollow";
        button.classList.add("following");
      } else if (isFollowing === "false") {
        button.textContent = "Follow";
        button.classList.remove("following");
      }
    }
  }

  updateAllButtons(userToFollow: string, followState: string) {
    const followButtons = document.querySelectorAll(
      `follow-button[data-user-name="${userToFollow}"]`
    );

    followButtons.forEach((button) => {
      button.setAttribute("data-is-following", followState);
    });
  }
}

customElements.define("follow-button", FollowButton);
