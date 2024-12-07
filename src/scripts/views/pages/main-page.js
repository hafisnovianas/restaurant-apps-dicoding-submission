import DicodingRestaurantSource from '../../data/dicodingrestaurant-source';
import CONFIG from '../../globals/config';
import Utils from '../../utils';
//const restaurantsJson = require('../../data/DATA.json');

const MainPage = {
  async render() {
    return `
      <section class="content">
        <h1 class="latest__label">Eksplorasi Rasa: Temukan Restoran Favorit Anda</h1>
        <restaurant-list minwidth="300" gutter="16"></restaurant-list>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingRestaurantSource.getRestaurantList();
    const restaurantsContainer = document.querySelector('restaurant-list');

    const restaurantItemElements = restaurants.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurant.pictureUrl = `${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`;
      restaurantItemElement.restaurant = restaurant;
      return restaurantItemElement;
    });

    restaurantsContainer.append(...restaurantItemElements);

    const headerElement = document.querySelector('header');
    headerElement.style.position = 'fixed';

    const heroElement = document.querySelector('#hero');
    Utils.showElement(heroElement);
  },
};

export default MainPage;