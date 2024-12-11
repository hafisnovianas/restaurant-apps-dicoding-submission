import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const restaurantdbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/') && !url.href.includes('/images/'),
  new NetworkFirst({
    cacheName: 'restaurantdb-api',
  }),
);

const restaurantdbImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
  new NetworkFirst({
    cacheName: 'restaurantdb-image-api',
  }),
);

const fontAwesomeApi = new Route(
  ({ url }) => url.href.startsWith('https://cdnjs.cloudflare.com/ajax/libs/font-awesome'),
  new NetworkFirst({
    cacheName: 'fontawesome-api',
  }),
);

registerRoute(restaurantdbImageApi);
registerRoute(restaurantdbApi);
registerRoute(fontAwesomeApi);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});