const restaurants = () => {
  const restaurantsJson = require('../public/data/DATA.json')
  const restaurantListElement = document.querySelector('restaurant-list')
  const mapPopupElement = document.querySelector('map-popup')

  const displayRestaurant = (restaurantList) => {
    const restaurantItemElements = restaurantList.map((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;

      restaurantItemElement.addEventListener('showMap', onShowMap)

      return restaurantItemElement;
    })
    
    restaurantListElement.append(...restaurantItemElements)
  }

  const onShowMap = (event) => {
    const { itemId } = event.detail
    const restaurantItem = restaurantsJson.restaurants.filter((item) => {
      return item.id === itemId
    })
    console.log(restaurantItem[0].name)

    mapPopupElement.showMap(restaurantItem[0].latitude, restaurantItem[0].longitude)
  }

  displayRestaurant(restaurantsJson.restaurants)
}

export default restaurants;