const cardProfileTemplate = document.createElement("template");

cardProfileTemplate.innerHTML = `
  <style>
    .card-profile {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }

    .avatar {
      aspect-ratio: 1;
      width: 50px;
      border-radius: 0.65rem;
      object-fit: cover;
      object-position: center;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .name {
      font-weight: bold;
      font-size: 0.8rem;
    }

    .profile {
      color: var(--text-color-secondary);
      font-size: 0.8rem;
    }

  </style>

    <div class="card-profile">
      <div>
        <img class="avatar" />
      </div>
      <div class="profile-info">
        <span class="name"></span>
        <a class="profile"></a>
      </div>
    </div>
`;

export class CardProfile extends HTMLElement {
  static get observedAttributes() {
    return ["data-username", "data-avatar-url"];
  }

  username: string = "";
  avatarUrl: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(cardProfileTemplate.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.addEventListener("click", (e) => this.handleClick(e));
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("click", (e) => this.handleClick(e));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-username":
          this.username = newValue || "No username found";
          break;
        case "data-avatar-url":
          this.avatarUrl = newValue || "/images/placeholder-avatar.jpg";
          break;
      }
      this.render();
    }
  }

  handleClick(e: Event) {
    e.preventDefault();
    window.location.href = `/profile/?username=${this.username}`;
  }

  render() {
    const avatar = this.shadowRoot?.querySelector(
      ".avatar"
    ) as HTMLImageElement;

    const name = this.shadowRoot?.querySelector(".name") as HTMLSpanElement;

    const profile = this.shadowRoot?.querySelector(
      ".profile"
    ) as HTMLAnchorElement;

    avatar.src = this.avatarUrl;
    name.innerText = this.username;
    profile.innerText = `@${this.username}`;
    profile.href = `/profile/?username=${this.username}`;
  }
}
