import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    // Buka/tutup drawer saat tombol hamburger di-klik
    this.#drawerButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.#navigationDrawer.classList.toggle('open');
    });

    // Tutup drawer saat area konten utama di-klik
    this.#content.addEventListener('click', (event) => {
      event.stopPropagation();
      this.#navigationDrawer.classList.remove('open');
    });

    // Tutup drawer saat salah satu link navigasi di-klik
    this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        this.#navigationDrawer.classList.remove('open');
      });
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/']; // Jika URL aneh, kembali ke Beranda

    // Gunakan View Transitions API jika didukung browser
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      });
    } else {
      // Fallback untuk browser yang tidak mendukung
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
