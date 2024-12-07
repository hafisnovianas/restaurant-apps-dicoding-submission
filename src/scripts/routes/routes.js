import MainPage from '../views/pages/main-page';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': MainPage, // default page
  '/main-page': MainPage,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;