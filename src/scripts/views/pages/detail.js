import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import DicodingRestaurantSource from '../../data/dicodingrestaurant-source';
import Utils from '../../utils/utils';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <section class="content">
        <h1 class="latest__label">DETAIL RESTORAN</h1>
        <restaurant-detail class="restaurant"></restaurant-detail>
        <div id="likeButtonContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DicodingRestaurantSource.getRestaurantDetail(url.id);

    const restaurantContainer = document.querySelector('restaurant-detail');
    restaurant.pictureUrl = `${CONFIG.BASE_IMAGE_URL}/large/${restaurant.pictureId}`;
    restaurantContainer.restaurant = restaurant;

    const heroElement = document.querySelector('#hero');
    Utils.hideElement(heroElement);

    const menusElement = document.createElement('restaurant-menus');
    menusElement.menus = restaurant.menus;
    menusElement.setAttribute('slot', 'menus-slot');
    restaurantContainer.appendChild(menusElement);

    const reviewsElement = document.createElement('restaurant-reviews');
    reviewsElement.reviews = restaurant.customerReviews;
    reviewsElement.setAttribute('slot', 'reviews-slot');
    restaurantContainer.appendChild(reviewsElement);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureUrl: restaurant.pictureUrl,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;