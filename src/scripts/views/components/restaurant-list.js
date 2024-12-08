import Utils from '../../utils/utils.js';

class RestaurantList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _minwidth = 300;
  _gutter = 24;

  static get observedAttributes() {
    return ['minwidth', 'gutter'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  set minwidth(value) {
    const newVal = Number(value);

    if (!Utils.isValidInteger(newVal)) return;

    this._minwidth = newVal;
  }

  get minwidth() {
    return this._minwidth;
  }

  set gutter(value) {
    const newVal = Number(value);

    if (!Utils.isValidInteger(newVal)) return;

    this._gutter = newVal;
  }

  get gutter() {
    return this._gutter;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        width: 100%;
        text-align: center;
      }
  
      .restaurant {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(${this._minwidth}px, 1fr));
        grid-auto-rows: 1fr;
        gap: ${this._gutter}px;

        margin: 32px auto auto;
        text-align: left;
      }

      @media screen and (min-width: 984px) {
        .restaurant {
          grid-column-gap: 10px;
          grid-row-gap: 16px;
        }
      }

      @media screen and (max-width: 363px) {
        .restaurant {
          grid-template-columns: 1fr;
        }
      }
    `;

  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="restaurant">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'minwidth':
      this.minwidth = newValue;
      break;
    case 'gutter':
      this.gutter = newValue;
      break;
    }
    this.render();
  }
}

customElements.define('restaurant-list', RestaurantList);