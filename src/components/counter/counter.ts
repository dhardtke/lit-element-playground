import {css, customElement, html, LitElement, property} from "lit-element";

@customElement("my-counter")
export class Counter extends LitElement {
    static styles = css`:host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
        background: yellow;
    }`;

    /**
     * The number of times the button has been clicked.
     */
    @property({type: Number})
    count = 0;

    render() {
        return html`
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
    }

    private _onClick() {
        this.count++;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-counter": Counter;
    }
}
