import { ProfileResponse } from "@/types/types";

const homeProfileTemplate = document.createElement("template");

homeProfileTemplate.innerHTML = `
  <style>
    .post__header__avatar img {
      border-radius: 0.65rem;
      aspect-ratio: 1;
      width: 50px;
      object-fit: cover;
    }
    .post__header__user {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .post__header__user span {
      font-weight: bold;
    }
    a {
      font-size: 0.8rem;
      text-decoration: none;
      color: var(--text-color-secondary);
      font-weight: bold;
    }
  </style>

  <div class="post__header__avatar">
    <img/>
  </div>
  <div class="post__header__user">
    <span></span>
    <a></a>
  </div>
`;

export class UserLoggedProfile extends HTMLElement {
  private post: ProfileResponse | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(homeProfileTemplate.content.cloneNode(true));
    }
  }

  set data(postData: ProfileResponse) {
    this.post = postData;
    this.render();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  handleClick = () => {
    window.location.href = `/profile/?username=${this.post?.name}`;
  };

  render() {
    const avatar = this.shadowRoot?.querySelector(
      ".post__header__avatar img"
    ) as HTMLImageElement;

    if (avatar) {
      avatar.src = this.post?.avatar.url || "";
    }

    const userName = this.shadowRoot?.querySelector(
      ".post__header__user span"
    ) as HTMLSpanElement;

    if (userName) {
      userName.innerText = this.post?.name || "";
    }

    const userLink = this.shadowRoot?.querySelector(
      ".post__header__user a"
    ) as HTMLAnchorElement;

    if (userLink) {
      userLink.href = `/profile/?username=${this.post?.name}`;
      userLink.innerText = `@${this.post?.name}`;
    }
  }
}

customElements.define("user-logged-profile", UserLoggedProfile);
