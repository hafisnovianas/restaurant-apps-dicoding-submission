class RestaurantDetail extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _restaurant = {
    id: null,
    name: null,
    description: null,
    city: null,
    address: null,
    pictureId: null,
    categories: null,
    menus: null,
    rating: null,
    customerReviews: null,
    pictureUrl: null,
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
      :host {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px 16px;
      }
      
      .movie__poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      h3 {
        margin: 8px 0;
      }

      .movie__title {
        margin-top: 0px;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 2em;
        letter-spacing: 1px;
      }

      p {
        line-height: 1.5em;
        text-align: justify;
        margin-top: 0px;
      }

      .rating {
        font-weight: 500;
      }

      .restaurant_review_container {
        background-color: #f4f4f4;
        border-radius: 8px;
        padding: 20px;
      }

      .categories {
        display: flex;
        list-style-type: none;
        padding: 0;
      }

      .category {
        margin-right: 5px;
        background-color: #f4f4f4;
        padding: 5px 10px;
        font-weight: 500;
      }

      @media screen and (min-width: 400px) {
        h3 {
          font-size: 18px;
        }

        p, ul, li {
          font-size: 14px;
        }
      }

      @media screen and (min-width: 900px) {
        :host {
          grid-template-columns: 1fr 1fr;
        }
      
        .movie__title {
          grid-column-start: 1;
          grid-column-end: 3;
        }

        .menus_container {
          grid-column-start: 2;
          grid-column-end: 3;
        }

        .restaurant_review_container {
          grid-row-start: 2;
          grid-row-end: 3;
        }
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <img 
        class="movie__poster" 
        src="${this._restaurant.pictureUrl}" 
        alt="${this._restaurant.name}" 
      />
      <div class="movie__info">
        <h2 class="movie__title">${this._restaurant.name}</h2>
        <p class="rating">Rating ⭐️ ${this._restaurant.rating}</h3>
        <h3>Kota</h3>
        <p>${this._restaurant.city}</p>
        <h3>Alamat</h3>
        <p>${this._restaurant.address}</p>
        <h3>Kategori</h3>
        <ul class="categories" id="categoryList"></ul>
        <h3>Overview</h3>
        <p>${this._restaurant.description}</p>
      </div>

      <div class="menus_container">
        <slot name="menus-slot"></slot>
      </div>

      <div class="restaurant_review_container">
        <slot name="reviews-slot"></slot>
        <slot name="add-review-slot"></slot>
      </div>
    `;

    const categoryList = this._shadowRoot.getElementById('categoryList');
    this._restaurant.categories.forEach((category) => {
      const li = document.createElement('li');
      li.className = 'category';
      li.textContent = category.name;
      categoryList.appendChild(li);
    });
  }
}

customElements.define('restaurant-detail', RestaurantDetail);