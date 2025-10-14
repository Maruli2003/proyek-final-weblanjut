import L from 'leaflet';
import Api from '../data/api';
import DatabaseHelper from '../data/database-helper';

const ProductsPage = {
  async render() {
    return `
      <section class="page-section container">
        <div class="products-header">
          <h2 class="section-title"><span>Koleksi Produk</span></h2>
          <p class="section-subtitle">Jelajahi semua cerita dan produk yang dibagikan oleh komunitas kami.</p>
        </div>
        <div id="map-container" style="height: 450px; width: 100%; border-radius: 8px; margin-bottom: 3rem; box-shadow: var(--shadow-md);"></div>
        <div id="product-list-container" class="product-list"><p>Memuat produk...</p></div>
      </section>
    `;
  },

  async afterRender() {
    const productListContainer = document.querySelector('#product-list-container');
    let map = null;

    const renderProducts = (products) => {
      productListContainer.innerHTML = '';
      if (!products || products.length === 0) {
        productListContainer.innerHTML = '<p>Belum ada produk untuk ditampilkan.</p>';
        return;
      }
      products.forEach(product => {
        productListContainer.innerHTML += `
          <div class="card product-item">
            <img src="${product.photoUrl}" alt="${product.name || 'Gambar Produk'}" class="card__image">
            <div class="card__content">
              <h3 class="product-item__title">${product.name}</h3>
              <p>${product.description}</p>
              <p class="product-item__date">Dibuat pada: ${new Date(product.createdAt).toLocaleDateString()}</p>
              <a href="#/products/${product.id}" class="button button--primary button--full">Lihat Detail</a>
            </div>
          </div>
        `;
      });
    };

    const initMap = (products) => {
      if (map) map.remove();
      map = L.map('map-container').setView([-2.5489, 118.0149], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      products.forEach(product => {
        if (product.lat && product.lon) {
          L.marker([product.lat, product.lon]).addTo(map)
            .bindPopup(`<b>${product.name}</b><br>${product.description.substring(0, 50)}...`);
        }
      });
    };

    // Strategi Cache-First, kemudian Network
    const cachedProducts = await DatabaseHelper.getAllStories();
    if (cachedProducts && cachedProducts.length > 0) {
      renderProducts(cachedProducts);
      initMap(cachedProducts);
    }

    try {
      const networkProducts = await Api.getAllStories();
      await DatabaseHelper.cacheStories(networkProducts);
      renderProducts(networkProducts);
      initMap(networkProducts);
    } catch (error) {
      console.error("Gagal memuat produk dari jaringan:", error);
      if (!cachedProducts || cachedProducts.length === 0) {
        productListContainer.innerHTML = `<p>Gagal memuat produk. Error: ${error.message}</p>`;
      }
    }
  },
};

export default ProductsPage;
