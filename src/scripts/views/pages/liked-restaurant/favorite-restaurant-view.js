import { createMovieItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantsView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Restaurant</h2>
  
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

    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createMovieItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyMovieTemplate()
    }
    document.getElementById('restaurants').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyMovieTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Restoran tidak ditemukan
      </div>
    `;
  }
}

export default FavoriteRestaurantsView;