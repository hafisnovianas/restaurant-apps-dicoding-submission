import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import Utils from '../../utils/utils';

const Favorite = {
  async render() {
    return `
      <section class="content">
        <h1 class="latest__label">Restoran Favorit Anda</h1>
        <restaurant-list minwidth="300" gutter="16"></restaurant-list>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('restaurant-list');

    const restaurantItemElements = restaurants.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      return restaurantItemElement;
    });

    restaurantsContainer.append(...restaurantItemElements);

    const heroElement = document.querySelector('#hero');
    Utils.hideElement(heroElement);
  },
};

export default Favorite;