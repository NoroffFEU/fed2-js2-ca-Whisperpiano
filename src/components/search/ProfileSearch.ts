const profileSearchTemplate = document.createElement("template");

profileSearchTemplate.innerHTML = `
  <style>
    article {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.65rem;
        padding: 1rem;
        border: 1px solid var(--secondary-color);
    }

    .profile__header {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        cursor: pointer;
    }

    .avatar {
        aspect-ratio: 1;
        width: 50px;
        border-radius: 0.65rem;
        object-fit: cover;
        object-position: center;
    }

    .profile__info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .nickname {
        font-weight: bold;
        font-size: 0.8rem;
    }

    .profile {
        color: var(--text-color-secondary);
        font-size: 0.8rem;
    }

    .followers {
        color: var(--text-color-secondary);
        font-size: 0.8rem;
    }

  </style>
  <article>
    <div class="profile__header">
        <div>
            <img class="avatar">
        </div>
        <div class="profile__info">
            <div class="profile__nickname">
                <span class="nickname"></span>
                <span class="profile"></span>
            </div>
            <span class="followers"></span>
        </div>
    </div>
    <follow-button></follow-button>
</article>
`;

export class ProfileSearch extends HTMLElement {
  username: string;
  avatarUrl: string;
  isFollowing: boolean;
  isUserPost: boolean;
  followers: number;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(
        profileSearchTemplate.content.cloneNode(true)
      );
    }

    this.username = this.getAttribute("data-username") || "No username found";
    this.avatarUrl =
      this.getAttribute("data-avatar-url") || "/images/placeholder-avatar.jpg";
    this.isFollowing = this.getAttribute("data-is-following") === "true";
    this.isUserPost = this.getAttribute("data-is-user-post") === "true";
    this.followers = Number(this.getAttribute("data-followers")) || 0;

    this.render();
  }

  connectedCallback() {
    const followButton = this.shadowRoot?.querySelector(
      "follow-button"
    ) as HTMLElement;

    const profileContainer = this.shadowRoot?.querySelector(
      ".profile__header"
    ) as HTMLElement;

    followButton.addEventListener("click", (e) => this.handleFollowButton(e));
    profileContainer.addEventListener("click", (e) =>
      this.navigateToProfile(e)
    );
  }

  disconnectedCallback() {
    const followButton = this.shadowRoot?.querySelector(
      "follow-button"
    ) as HTMLElement;

    const profileContainer = this.shadowRoot?.querySelector(
      ".profile__header"
    ) as HTMLElement;

    followButton.removeEventListener("click", (e) =>
      this.handleFollowButton(e)
    );

    profileContainer.removeEventListener("click", (e) =>
      this.navigateToProfile(e)
    );
  }

  handleFollowButton(e: Event) {
    this.isFollowing = !this.isFollowing;

    if (this.isFollowing) {
      this.followers++;
    } else {
      this.followers--;
    }

    this.setAttribute("data-is-following", this.isFollowing.toString());
    this.setAttribute("data-followers", this.followers.toString());

    this.render();
  }

  navigateToProfile(e: Event) {
    const user = this.getAttribute("data-username");
    window.location.href = `/profile/?username=${user}`;
  }

  render() {
    const nameContainer = this.shadowRoot?.querySelector(
      ".nickname"
    ) as HTMLSpanElement;

    const profileContainer = this.shadowRoot?.querySelector(
      ".profile"
    ) as HTMLSpanElement;

    const avatarContainer = this.shadowRoot?.querySelector(
      ".avatar"
    ) as HTMLImageElement;

    const followButton = this.shadowRoot?.querySelector(
      "follow-button"
    ) as HTMLElement;

    const followersContainer = this.shadowRoot?.querySelector(
      ".followers"
    ) as HTMLSpanElement;

    nameContainer.innerText = this.username;
    profileContainer.innerText = `@${this.username}`;
    avatarContainer.src = this.avatarUrl;
    avatarContainer.alt = `${this.username} avatar`;
    followersContainer.innerText = `${this.followers} followers`;
    followButton.setAttribute("data-user-name", this.username);
    followButton.setAttribute("data-is-following", this.isFollowing.toString());
    followButton.setAttribute("data-is-user-post", this.isUserPost.toString());
  }
}
