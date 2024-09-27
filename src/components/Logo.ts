const logoTemplate = document.createElement("template");

logoTemplate.innerHTML = `
  <style>
    .logo {
      max-width: 120px;
      margin-block: 1.25rem;
      margin-left: 1rem;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;
      
      &:hover {
        opacity: 0.8;
      }
    }
  </style>
  <img class="logo" src="/images/noroff-logo-white.png" alt="Noroff Logo" />
`;

class Logo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(logoTemplate.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.addEventListener("click", (e) => this.handleLogoClick(e));
  }

  disconnectedCallback() {
    this.removeEventListener("click", (e) => this.handleLogoClick(e));
  }

  handleLogoClick(e: Event) {
    e.preventDefault();
    window.location.href = "/home/";
  }
}

export function loadLogo() {
  if (!customElements.get("logo-component")) {
    customElements.define("logo-component", Logo);
  }
}
