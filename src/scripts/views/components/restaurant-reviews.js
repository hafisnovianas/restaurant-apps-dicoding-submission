class RestaurantReviews extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _reviews = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set reviews(value) {
    this._reviews = value;
    this.render();
  }

  get reviews() {
    return this._reviews;
  }

  _updateStyle() {
    this._style.textContent = `
      .review {
        border-bottom: 1px solid #ddd;
        padding: 15px 0;
      }

      .review:last-child {
        border-bottom: none;
      }

      .review h3 {
        margin: 0;
        font-size: 1.2em;
        color: #333;
      }

      .review p {
        margin: 5px 0;
        color: #555;
      }

      .review .date {
        font-size: 0.9em;
        color: #999;
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <h2>Customer Reviews</h2>
    `;

    this._populateReviews();
  }

  _populateReviews() {
    if (this._reviews) {
      this._reviews.forEach((review) => {
        this._shadowRoot.innerHTML += `
          <div class="review">
            <h3>${review.name}</h3>
            <p>${review.review}</p>
            <p class="date">${review.date}</p>
          </div>
        `;
      });
    }
  }
}

customElements.define('restaurant-reviews', RestaurantReviews);