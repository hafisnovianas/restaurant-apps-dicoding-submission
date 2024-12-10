import API_ENDPOINT from '../globals/api-endpoint';

class DicodingRestaurantSource {
  static async doFetch(endpoint, postOptions = {}) {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
    };

    if (postOptions) {
      options = postOptions;
    }

    const response = await fetch(endpoint, options);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error('Tidak dapat menampilkan data restoran karena sedang offline');
    }

    return await response.json();
  }

  static async getRestaurantList() {
    const responseJson = await this.doFetch(API_ENDPOINT.LIST);
    return responseJson.restaurants;
  }

  static async getRestaurantDetail(id) {
    const responseJson = await this.doFetch(API_ENDPOINT.DETAIL(id));
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

    const responseJson = await this.doFetch(API_ENDPOINT.ADD_REVIEW, options);
    return responseJson.customerReviews;
  }
}

export default DicodingRestaurantSource;