import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import DicodingRestaurantSource from '../../data/dicodingrestaurant-source';
import Utils from '../../utils/utils';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    const heroElement = document.querySelector('#hero');
    Utils.hideElement(heroElement);

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

    const menusElement = document.createElement('restaurant-menus');
    menusElement.menus = restaurant.menus;
    menusElement.setAttribute('slot', 'menus-slot');
    restaurantContainer.appendChild(menusElement);

    const addReviewElement = document.createElement('add-review');
    addReviewElement.id = restaurant.id;
    addReviewElement.setAttribute('slot', 'add-review-slot');
    restaurantContainer.appendChild(addReviewElement);
    addReviewElement.addEventListener('save', onSaveButtonClickHandler);

    const reviewsElement = document.createElement('restaurant-reviews');
    reviewsElement.reviews = restaurant.customerReviews;
    reviewsElement.setAttribute('slot', 'reviews-slot');
    restaurantContainer.appendChild(reviewsElement);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
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

const onSaveButtonClickHandler = async (event) => {
  console.log('save diclick');
  const { id, name, review } = event.detail;

  const reviewData = {
    id: id,
    name: name,
    review: review,
  };

  Utils.showLoading();
  try {
    const reviews = await DicodingRestaurantSource.addReview(reviewData);
    updateReviews(reviews);
    Utils.hideLoading();
  } catch (error) {
    console.error(error);
    Utils.showError('No Internet', 'Tidak dapat menambahkan review karena sedang offline');
  }
};

const updateReviews = async (reviews) => {
  const reviewsElement = document.querySelector('restaurant-reviews');
  reviewsElement.reviews = reviews;
};

