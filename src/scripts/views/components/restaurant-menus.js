class RestaurantMenus extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _menus = {
    foods: null,
    drinks: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set menus(value) {
    this._menus = value;
    this.render();
  }

  get menus() {
    return this._menus;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .menu {
        background-color: #f8f8f8;
        border-radius: 5px;
        padding: 20px;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
      }

      li:last-child {
        border-bottom: none;
      }
    `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="menu">
          <h2>Menu Makanan</h2>
          <ul id="food-list"></ul>
        </div>
        <div class="menu">
            <h2>Menu Minuman</h2>
            <ul id="drink-list"></ul>
        </div>
    `;

    this._populateMenus();
  }

  _populateMenus() {
    const foodList = this._shadowRoot.getElementById('food-list');
    const drinkList = this._shadowRoot.getElementById('drink-list');

    this._menus.foods.forEach((food) => {
      const li = document.createElement('li');
      li.textContent = food.name;
      foodList.appendChild(li);
    });

    this._menus.drinks.forEach((drink) => {
      const li = document.createElement('li');
      li.textContent = drink.name;
      drinkList.appendChild(li);
    });
  }
}

customElements.define('restaurant-menus', RestaurantMenus);