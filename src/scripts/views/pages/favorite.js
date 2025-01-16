import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import Utils from '../../utils/utils';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ favoriteRestaurants: FavoriteRestaurantIdb, view });

    const heroElement = document.querySelector('#hero');
    Utils.hideElement(heroElement);
  },
};

export default Favorite;