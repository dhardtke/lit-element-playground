import {customElement, html, LitElement, property, query} from "lit-element";

import * as katexCss from "katex/dist/katex.css";
import renderMathInElement from "katex/dist/contrib/auto-render";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("katex-formula")
export class KatexFormula extends LitElement {
    static css = katexCss;

    @property()
    formula = `$f(x) = x^2$`;

    @query("#container")
    private container: any;

    async performUpdate() {
        super.performUpdate();

        this.container.innerText = this.formula;
        renderMathInElement(this.container, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true}
            ]
        });
    }

    private async _change(e: InputEvent) {
        this.formula = (e.target as HTMLInputElement).value;
        await this.requestUpdate();
    }

    render() {
        return html`
            <input type="text" value="${this.formula}" @input="${this._change}">
            <div id="container"></div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "katex-formula": KatexFormula;
    }
}
