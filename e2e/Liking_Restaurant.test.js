Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Restoran tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('Liking a restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.seeElement('.restaurant-item__not__found', 'Restoran tidak ditemukan');

  I.amOnPage('/#/main-page');

  I.seeElement('restaurant-list');

  I.executeScript(() => {
    const restaurantItem = document.querySelector('restaurant-item').shadowRoot.querySelector('.restaurant-item_title a');
    restaurantItem.click();
  });

  const likeButton = locate('#likeButton');

  I.click(likeButton);

  I.amOnPage('/#/favorite');

  I.seeElement('restaurant-list');

  I.executeScript(() => {
    const restaurantItem = document.querySelector('restaurant-item');

    return restaurantItem;
  });
});

Scenario('Unliking a restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.seeElement('.restaurant-item__not__found', 'Restoran tidak ditemukan');

  I.amOnPage('/#/main-page');

  I.seeElement('restaurant-list');

  I.executeScript(() => {
    const restaurantItem = document.querySelector('restaurant-item').shadowRoot.querySelector('.restaurant-item_title a');
    restaurantItem.click();
  });

  const likeButton = locate('#likeButton');

  I.click(likeButton);

  I.amOnPage('/#/favorite');

  I.seeElement('restaurant-list');

  I.executeScript(() => {
    const restaurantItem = document.querySelector('restaurant-item').shadowRoot.querySelector('.restaurant-item_title a');
    restaurantItem.click();
  });

  I.click(likeButton);

  I.amOnPage('/#/favorite');

  I.seeElement('.restaurant-item__not__found', 'Restoran tidak ditemukan');
});