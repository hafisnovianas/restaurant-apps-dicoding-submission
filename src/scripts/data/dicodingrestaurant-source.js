import API_ENDPOINT from '../globals/api-endpoint';

class DicodingRestaurantSource {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async upcomingMovies() {
    const response = await fetch(API_ENDPOINT.UPCOMING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(review),
    };

    const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Something went wrong');
    }

    const responseJson = await response.json();
    return responseJson.customerReviews;
  }
}

export default DicodingRestaurantSource;