import { deleteComment } from "@/js/api/post/delete";
import { getUser } from "@/js/utilities/getUser";
import { CommentResponse, ProfileResponse } from "@/types/types";

const commentTemplate = document.createElement("template");

commentTemplate.innerHTML = `
  <style>
    .comment__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.65rem;
    }

    .user-profile {
      display: flex;
      gap: 0.65rem;
      align-items: center;
      cursor: pointer;

     
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    ::slotted(.avatar) {
      aspect-ratio: 1;
      max-width: 50px;
      border-radius: 50%;
    }
      
    ::slotted(.name) {
      font-weight: bold;
      margin: 0;
    }

    ::slotted(.profile) {
      color: var(--text-color-secondary);
      margin: 0;
      font-size: 0.8rem;
    }

    ::slotted(.time) {
      color: var(--text-color-secondary);
      font-size: 0.8rem;
    }



  </style>
  <hr>
  <article class="comment">
    <div class="comment__header">
      <div class="user-profile">
        <slot name="card-profile"></slot>
      </div>
      <div>
        <slot name="time"></slot>
      </div>
    </div>
    <div> 
      <slot name="body"></slot>
    </div>
    <div class="comment-buttons">
      <button class="reply-btn">Reply</button>
      <button class="delete-btn">Delete</button>
    </div>
  </article>
`;

export class CommentTemplate extends HTMLElement {
  commentId: number;
  postId: number;
  profileContainer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(commentTemplate.content.cloneNode(true));
    }

    const replyBtn = this.shadowRoot?.querySelector(
      ".reply-btn"
    ) as HTMLButtonElement;

    const deleteBtn = this.shadowRoot?.querySelector(
      ".delete-btn"
    ) as HTMLButtonElement;

    this.commentId = Number(this.getAttribute("data-comment-id"));
    this.postId = Number(this.getAttribute("data-post-id"));

    this.profileContainer = this.shadowRoot?.querySelector(
      ".user-profile"
    ) as HTMLDivElement;

    if (replyBtn && deleteBtn) {
      replyBtn.addEventListener("click", (e) => this.handleReplyComment(e));
      deleteBtn.addEventListener("click", (e) => this.handleDeleteComment(e));
    }
  }

  set commentData(commentData: CommentResponse) {
    const timeElement = document.createElement("span");
    timeElement.slot = "time";
    timeElement.classList.add("time");
    timeElement.innerText = "now";
    this.appendChild(timeElement);

    const bodyElement = document.createElement("p");
    bodyElement.slot = "body";
    bodyElement.innerText = commentData.body;
    this.appendChild(bodyElement);
  }

  set commentUser(user: ProfileResponse) {
    const cardProfile = document.createElement("card-profile");
    cardProfile.setAttribute("data-username", user.name);
    cardProfile.setAttribute("data-avatar-url", user.avatar.url);
    this.profileContainer.appendChild(cardProfile);

    this.setAttribute("data-owner", user.name);
  }

  connectedCallback() {
    this.checkIfUserIsOwner();
  }

  async handleDeleteComment(e: Event) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      try {
        const postId = Number(this.getAttribute("data-post-id"));
        const commentId = Number(this.getAttribute("data-comment-id"));

        await deleteComment(postId, commentId);
        this.remove();
      } catch (error) {
        console.error(error);
      }
    }
  }

  checkIfUserIsOwner() {
    const commentOwner = this.getAttribute("data-owner");
    const user = getUser();
    if (commentOwner !== user) {
      this.shadowRoot?.querySelector(".delete-btn")?.remove();
    }
  }

  handleReplyComment(e: Event) {
    const idReply = this.getAttribute("data-comment-id");
    console.log(`Reply button to comment with id: ${idReply}`);
  }
}
