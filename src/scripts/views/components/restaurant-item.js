class RestaurantItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _restaurant = {
    id: null,
    name: null,
    description: null,
    pictureUrl: null,
    city: null,
    rating: null,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set restaurant(value) {
    this._restaurant = value;
    this.render();
  }

  get restaurant() {
    return this._restaurant;
  }

  _updateStyle() {
    this._style.textContent = `
      a, button {
        box-sizing: border-box;
        display: inline-block;
        min-width: 44px;
        min-height: 44px;
        line-height: 44px;
        font-weight: 500;
      }

      .restaurant-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      }

      .restaurant-item_city {
        color: #223134;
        position: absolute;
        top: 10px;
        left: 0;
        padding-inline: 15px;
        background-color: rgba(230, 199, 103, 0.9);
        transition: 0.3s opacity;
        border: none;
      }

      .restaurant-item_city:hover {
        background-color: rgba(230, 199, 103, 1);
        cursor: pointer;
      }

      .restaurant-item_content {
        padding: 16px;
      }

      .restaurant-item_thumbnail {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .restaurant-item_rating {
        font-size: 10px;
        text-transform: uppercase;
        color: #999;
        margin: 0;
      }

      .restaurant-item_title {
        font-size: 16px;
        margin: 0;
        transition: 0.3s opacity;
      }

      .restaurant-item_title:hover {
        opacity: 0.5;
      }

      .restaurant-item_title a {
        color: inherit;
        text-decoration: none;
      }

      .restaurant-item_description {
        margin: 0;
        font-size: 12px;
        line-height: 1.5em;
        text-align: justify;

        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      
      @media screen and (min-width: 400px) {
        .restaurant-item_content {
          padding: 16px 32px 32px 32px;
        }

        .restaurant-item_title {
          font-size: 18px;
        }

        .restaurant-item_description {
          font-size: 14px;
        }
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <article class="restaurant-item" id=${this._restaurant.id}>
        <img 
          class="restaurant-item_thumbnail"
          src=${this._restaurant.pictureUrl}
          alt="Iustrasi ${this._restaurant.name || '-'}"
          loading="lazy"
        />
        
        <button class="restaurant-item_city">Kota: ${this._restaurant.city || '-'}</button>

        <div class="restaurant-item_content">
          <p class="restaurant-item_rating">
            Rating ${this._restaurant.rating || '-'}
          </p>

          <h1 class="restaurant-item_title">
            <a href="/#/detail/${this._restaurant.id}">${this._restaurant.name || '-'}</a>
          </h1>
          <p class="restaurant-item_description">${this._restaurant.description || '-'}</p>
        </div>
      </article>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);