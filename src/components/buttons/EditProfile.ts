// This component is a button that allows the user to edit their profile

const editProfileTemplate = document.createElement("template");

editProfileTemplate.innerHTML = `
  <style>
    button {
        color: var(--text-color-primary);
        border: 1px solid var(--text-color-secondary);
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.25rem 0.65rem;
        border-radius: 0.65rem;
        transition: all 0.2s ease-in-out; cursor: pointer; 
        background-color: var(--tertiary-color);
    }
    button:hover {
      opacity: 0.8;
    }
  </style>
  <button>
    <slot></slot>
  </button>
`;

export class EditProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(editProfileTemplate.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.addEventListener("click", (e) => this.handleEditProfile(e));
  }

  disconnectedCallback() {
    this.removeEventListener("click", (e) => this.handleEditProfile(e));
  }

  handleEditProfile(e: Event) {
    e.preventDefault();
    const userName = this.getAttribute("data-user-name");
    window.location.href = `/profile/edit/?username=${userName}`;
  }
}
