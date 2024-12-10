class AddReview extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _submitEvent = 'submit';
  _saveEvent = 'save';
  _id = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  set id(value) {
    this._id = value;
    this.render();
  }

  get id() {
    return this._id;
  }

  clear() {
    this._shadowRoot.querySelector('input#title').value = '';
    this._shadowRoot.querySelector('textarea#body').value = '';
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', (event) => this._onFormSubmit(event, this));
    this._shadowRoot
      .querySelector('input#title')
      .addEventListener('blur', (event) => this._blurEventHandler(event));
    this._shadowRoot
      .querySelector('textarea#body')
      .addEventListener('blur', (event) => this._blurEventHandler(event));
    this.addEventListener(this._submitEvent, this._onAddNoteSubmit);
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector('form')
      .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
    this._shadowRoot
      .querySelector('input#title')
      .removeEventListener('blur', (event) => this._blurEventHandler(event));
    this._shadowRoot
      .querySelector('textarea#body')
      .removeEventListener('blur', (event) => this._blurEventHandler(event));
    this.removeEventListener(this._submitEvent, this._onAddNoteSubmit);
  }

  _onFormSubmit(event, addNoteInstance) {
    addNoteInstance.dispatchEvent(new CustomEvent('submit'));

    event.preventDefault();
  }

  _onAddNoteSubmit() {
    const name = this._shadowRoot.querySelector('input#title').value;
    const review = this._shadowRoot.querySelector('textarea#body').value;
    const id = this._id;
    this.dispatchEvent(
      new CustomEvent(this._saveEvent, {
        detail: { id, name, review },
        bubbles: true,
      }),
    );
    this.clear();
  }

  _customValidationHandler(event) {
    event.target.setCustomValidity('');

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.');
      return;
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity('Minimal panjang adalah 3 karakter.');
      return;
    }

    if (event.target.validity.tooLong) {
      event.target.setCustomValidity('Maksimal panjang adalah 50 karakter.');
      return;
    }
  }

  _blurEventHandler(event) {
    this._customValidationHandler(event);
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute('aria-describedby');
    const connectedValidationEl = connectedValidationId
      ? this._shadowRoot.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = '';
    }
  }

  _updateStyle() {
    this._style.textContent = `
      .content-form {
        flex-direction: column;
        margin: 0;
      }

      .content-form .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
      }

      .content-form .form-group label {
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .content-form button {
        width: 100%;
        min-width: 44px;
        min-height: 44px;
        padding-inline: 1.3em;
        border-radius: 8px;
        border-color: #223134;
      
        color: #223134;
        font-weight: 700;
      
        transition: 150ms all ease-in-out;
      }

      .content-form button:hover {
        background-color: #E6C767;
        cursor: pointer;
      }

      input, textarea {
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        outline: none;
        resize: none;
      }

      input:focus, textarea:focus {
        border-color: #46a6f5;
        box-shadow: 0 0 4px rgba(70, 166, 245, 0.5);
      }

      button:hover {
        background-color: #ffffff;
        color: black;
      }

      .validation-message {
        margin-block-start: 0.5rem;
        color: red;
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <h2>Berikan Review Anda</h2>
      <form class="content-form">
        <div class="form-group">
          <label for="title">Nama</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required
            minlength="6"
            maxlength="50"
            aria-describedby="titleValidation"
          />
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>

          <label for="body">Tulis Review Anda</label>
          <textarea 
            id="body" 
            name="body" 
            rows="2" 
            required
            minlength="3"
            aria-describedby="bodyValidation"
          ></textarea>
          <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
        </div>
        <button>Kirim</button>
      </form>
    `;
  }
}

customElements.define('add-review', AddReview);
