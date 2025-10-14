import Api from '../data/api';
import L from 'leaflet';

class ProductsPresenter {
  constructor({ view }) {
    this._view = view;
    // this._api = Api; // <-- HAPUS BARIS INI
    
    this._showProducts();
  }

  async _showProducts() {
    try {
      // UBAH CARA MEMANGGIL MENJADI SEPERTI DI BAWAH INI
      const stories = await Api.getAllStories(); 
      
      const productListContainer = document.querySelector('#product-list');
      const mapContainerId = 'map';
      
      this._renderProductList(productListContainer, stories);
      const markers = this._initializeMap(mapContainerId, stories);
      
      this._addHoverInteraction(productListContainer, markers);

    } catch (error) {
      console.error(error);
      document.querySelector('#product-list').innerHTML = '<p>Gagal memuat data. Silakan coba lagi nanti.</p>';
    }
  }

  _renderProductList(container, stories) {
    container.innerHTML = '';
    stories.forEach(story => {
      container.innerHTML += `
        <article class="product-item" data-id="${story.id}">
          <img src="${story.photoUrl}" alt="${story.name}" class="product-item__thumbnail">
          <div class="product-item__content">
            <h3 class="product-item__title">${story.name}</h3>
            <p class="product-item__description">${story.description}</p>
          </div>
        </article>
      `;
    });
  }
  
  _initializeMap(containerId, stories) {
    const map = L.map(containerId).setView([-6.2088, 106.8456], 11);

    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    });
    
    const baseMaps = {
      "Street View": openStreetMap,
      "Satellite View": satelliteMap
    };

    L.control.layers(baseMaps).addTo(map);
    
    const markers = {};
    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map)
          .bindPopup(`<b>${story.name}</b><br>${story.description}`);
        markers[story.id] = marker;
      }
    });

    return markers;
  }

  _addHoverInteraction(listContainer, markers) {
    const productItems = listContainer.querySelectorAll('.product-item');
    const defaultIcon = new L.Icon.Default();
    const highlightedIcon = new L.Icon.Default({ className: 'highlighted-marker' });

    productItems.forEach(item => {
      const storyId = item.dataset.id;
      const marker = markers[storyId];

      if (marker) {
        item.addEventListener('mouseover', () => {
          marker.setIcon(highlightedIcon).openPopup();
        });

        item.addEventListener('mouseout', () => {
          marker.setIcon(defaultIcon).closePopup();
        });
      }
    });
  }
}

export default ProductsPresenter;