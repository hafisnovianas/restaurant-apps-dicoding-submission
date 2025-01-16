import '../../components/components';
import Utils from '../../../utils/utils';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="content">
        <h1 class="latest__label">Restoran Favorit Anda</h1>
        
        <input id="query" type="text">
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    const container = document.getElementById('restaurants');
    Utils.emptyElement(container);

    if (restaurants.length) {
      html = this._getRestaurantListElement(restaurants);
      container.appendChild(html);
    } else {
      html = this._getEmptyRestaurantTemplate();
      container.innerHTML = html;
    }

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Restoran tidak ditemukan
      </div>
    `;
  }

  _getRestaurantListElement(restaurants) {
    const restaurantsListElement = document.createElement('restaurant-list');
    restaurantsListElement.minwidth = '300';
    restaurantsListElement.gutter = '16';

    const restaurantItemElements = restaurants.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      return restaurantItemElement;
    });

    restaurantsListElement.append(...restaurantItemElements);
    return restaurantsListElement;
  }
}

export default FavoriteRestaurantView;