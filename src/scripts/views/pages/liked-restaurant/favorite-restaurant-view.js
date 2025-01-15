import { createMovieItemTemplate } from '../../templates/template-creator';
import '../../components/components';

class FavoriteRestaurantsView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Restaurant</h2>
  
        <div id="restaurants" class="restaurants">
          <restaurant-list minwidth="300" gutter="16"></restaurant-list>
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

    if (restaurants.length) {
      html = this._getRestaurantListElement(restaurants);
      document.getElementById('restaurants').appendChild(html);
    } else {
      html = this._getEmptyRestaurantTemplate();
      document.getElementById('restaurants').innerHTML = html;
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
    const restaurantsListElement = document.querySelector('restaurant-list');

    const restaurantItemElements = restaurants.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      return restaurantItemElement;
    });

    restaurantsListElement.append(...restaurantItemElements);
    return restaurantsListElement;
  }
}

export default FavoriteRestaurantsView;