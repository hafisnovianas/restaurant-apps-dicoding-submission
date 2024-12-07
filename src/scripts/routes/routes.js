import MainPage from '../views/pages/main-page';
//import Upcoming from '../views/pages/upcoming';
import Detail from '../views/pages/detail';
//import Like from '../views/pages/like';

const routes = {
  '/': MainPage, // default page
  '/main-page': MainPage,
  //'/upcoming': Upcoming,
  '/detail/:id': Detail,
  //'/like': Like,
};

export default routes;