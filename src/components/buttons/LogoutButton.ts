// This component is a button that allows the user to logout

const logoutButtonTemplate = document.createElement("template");

logoutButtonTemplate.innerHTML = `
  <style>
    button {
        background-color: var(--button-primary-color);
        color: var(--text-color-primary);
        border: 1px solid var(--secondary-color);
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.25rem 0.65rem;
        border-radius: 0.65rem;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
      background-color: var(--link-color);
      color: var(--text-color-primary);
    }
  </style>
  <button>
    <slot></slot>
  </button>
`;

export class LogoutButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(logoutButtonTemplate.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.addEventListener("click", (e) => this.handleLogout(e));
  }

  disconnectedCallback() {
    this.removeEventListener("click", (e) => this.handleLogout(e));
  }

  handleLogout(e: Event) {
    e.preventDefault();
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      window.location.href = "/";
    }
  }
}

export function loadLogoutButton() {
  if (!customElements.get("logout-button")) {
    customElements.define("logout-button", LogoutButton);
  }
}
