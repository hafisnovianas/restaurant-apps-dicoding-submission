const restaurants = () => {
  const restaurantsJson = require('../public/data/DATA.json')
  const restaurantListElement = document.querySelector('restaurant-list')

  const displayRestaurant = (restaurantList) => {
    const restaurantItemElements = restaurantList.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;

      return restaurantItemElement;
    })
    
    restaurantListElement.append(...restaurantItemElements)
  }

  displayRestaurant(restaurantsJson.restaurants)

}

export default restaurants;