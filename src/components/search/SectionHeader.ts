const sectionHeaderTemplate = document.createElement("template");

sectionHeaderTemplate.innerHTML = `
  <style>
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.65rem;
      padding: 1rem;
      border: 1px solid var(--secondary-color);
      background-color: var(--tertiary-color);

    }

    a {
        color: var(--text-color-primary);
        text-decoration: none;
        font-size: 0.8rem;
    }

    a:last-of-type {
      color: var(--text-color-secondary);
      margin-right: 0.65rem;
    }

  </style>
  <div class="section-header">
    <a href="javascript:void(0)" class="title"></a>
    <a href="javascript:void(0)" class="view-all">View all</a>
  </div>
`;

export class SectionHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(
        sectionHeaderTemplate.content.cloneNode(true)
      );
    }
  }

  static get observedAttributes() {
    return ["data-title"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const component = this.getAttribute("data-title");

    if (component === "profiles") {
      const title = this.shadowRoot?.querySelector(".title") as HTMLElement;
      title.textContent = "👤 Profiles";
    }

    if (component === "posts") {
      const title = this.shadowRoot?.querySelector(".title") as HTMLElement;
      title.textContent = "📝 Posts";
    }
  }
}
