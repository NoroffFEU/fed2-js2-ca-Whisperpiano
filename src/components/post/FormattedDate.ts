const formattedDateTemplate = document.createElement("template");

formattedDateTemplate.innerHTML = `
  <style>
    .formatted-date {
      color: var(--text-color-secondary);
      font-size: 0.8rem;
    }
    .updated-date {
      color: var(--text-color-secondary);
      font-size: 0.8rem;

      & span {
        color: var(--text-color-primary);
      }
      
    }
  </style>
  <div class="formatted-date__container">
    <p class="formatted-date"></p>
    <p class="updated-date"></p>
  </div>
  `;

export class FormattedDate extends HTMLElement {
  created: Date | null;
  updated: Date | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(
        formattedDateTemplate.content.cloneNode(true)
      );
    }

    const created = this.getAttribute("data-created");
    const updated = this.getAttribute("data-updated");

    this.created = created ? new Date(created) : null;
    this.updated = updated ? new Date(updated) : null;
  }

  static get observedAttributes() {
    return ["data-created", "data-updated"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  formatDate(date: Date) {
    const dateToTransform = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = dateToTransform.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  checkIfUpdated() {
    return this.updated?.getTime() === this.created?.getTime() ? false : true;
  }

  render() {
    const createdElement = this.shadowRoot?.querySelector(
      ".formatted-date"
    ) as HTMLParagraphElement;

    const updatedElement = this.shadowRoot?.querySelector(
      ".updated-date"
    ) as HTMLParagraphElement;

    if (createdElement && this.created) {
      const formattedDate = this.formatDate(this.created);
      createdElement.innerHTML = formattedDate;
    }

    if (this.checkIfUpdated() && updatedElement && this.updated) {
      const formattedDate = this.formatDate(this.updated);
      updatedElement.innerHTML = `Last edited: <span>${formattedDate}</span>`;
    } else {
      updatedElement?.remove();
    }
  }
}
