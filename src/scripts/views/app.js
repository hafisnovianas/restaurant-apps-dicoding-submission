import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Utils from '../utils/utils';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    Utils.showLoading();
    try {
      await page.afterRender();
      Utils.hideLoading();
    } catch {
      Utils.showError('No Internet', 'Tidak dapat menampilkan data restoran karena sedang offline');
    }
  }
};

export default App;
