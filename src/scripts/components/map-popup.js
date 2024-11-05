class MapPopup extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open'});
    this._style = document.createElement('style');

    this.render()
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('button')
      .addEventListener('click', (event) => this.hideMap())
    this._shadowRoot
      .querySelector('.overlay')
      .addEventListener('click', (event) => this.hideMap())
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector('button')
      .removeEventListener('click', (event) => this.hideMap())
    this._shadowRoot
      .querySelector('.overlay')
      .removeEventListener('click', (event) => this.hideMap())
  }

  showMap(latitude, longitude) {
    const mapFrame = this._shadowRoot.getElementById("mapFrame");
    mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    this.style.display = "block";
  }

  hideMap() {
    this.style.display = "none";
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: none;
      }

      .map-popup {
        display: flex;
        flex-direction: column;
        gap: 5px;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 80%;
        max-width: 600px;
        height: 54%;
        max-height: 400px;

        background: white;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        padding: 10px;
        overflow: hidden;
      }

      .map-popup button {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 10px;

        min-width: 44px;
        min-height: 44px;
        
        border: none;
        border-radius: 0 10px;

        transition: background-color 0.3s, color 0.3s;
      }

      .map-popup button:hover {
        cursor: pointer;
      }

      .map-popup iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    `
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();
    this._shadowRoot.appendChild(this._style)

    this._shadowRoot.innerHTML += `
      <div class="overlay"></div>
      <div class="map-popup" id="mapPopup">
          <button >✖</button>
          <iframe id="mapFrame" src="" allowfullscreen></iframe>
      </div>
    `
  }
}

customElements.define('map-popup',MapPopup);