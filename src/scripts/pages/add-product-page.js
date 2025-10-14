import L from 'leaflet';
import Api from '../data/api';
import DatabaseHelper from '../data/database-helper';

const AddProductPage = {
  async render() {
    return `
      <section class="content">
        <div class="form-container">
          <h2>Tambah Produk Baru</h2>
          <p class="form-subtitle">Bagikan produk Anda dengan komunitas.</p>
          <form id="add-product-form" class="add-product-form" novalidate>
            <div class="form-group">
              <label for="product-name">Nama Produk</label>
              <input type="text" id="product-name" name="product-name" required>
            </div>
            <div class="form-group">
              <label for="product-description">Deskripsi</label>
              <textarea id="product-description" name="description" rows="4" required></textarea>
            </div>
            <div class="form-group">
              <label for="product-photo">Foto Produk</label>
              <input type="file" id="product-photo" name="photo" accept="image/*" required>
            </div>
            <div class="form-group">
              <label>Pilih Lokasi di Peta</label>
              <div id="map-picker" style="height: 300px; width: 100%;"></div>
              <input type="hidden" id="latitude" name="lat">
              <input type="hidden" id="longitude" name="lon">
              <p class="location-display">Lokasi Terpilih: <span id="selected-location">-</span></p>
            </div>
            <button type="submit" class="submit-btn">Tambah Produk</button>
          </form>
        </div>
      </section>
    `;
  },

  async afterRender() {
    this._initMapPicker();
    this._initFormSubmit();
  },

  _initMapPicker() {
    const map = L.map('map-picker').setView([-6.2088, 106.8456], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let marker;
    map.on('click', (e) => {
      if (marker) map.removeLayer(marker);
      marker = L.marker(e.latlng).addTo(map);
      document.querySelector('#latitude').value = e.latlng.lat;
      document.querySelector('#longitude').value = e.latlng.lng;
      document.querySelector('#selected-location').textContent = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
    });
  },

  _initFormSubmit() {
    const form = document.querySelector('#add-product-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = {
        description: `${document.querySelector('#product-name').value}\n\n${document.querySelector('#product-description').value}`,
        photo: document.querySelector('#product-photo').files[0],
        lat: parseFloat(document.querySelector('#latitude').value),
        lon: parseFloat(document.querySelector('#longitude').value),
      };

      if (!formData.description || !formData.photo || !formData.lat || !formData.lon) {
        alert('Semua field wajib diisi.');
        return;
      }
      
      if (navigator.onLine) {
        this._sendData(formData);
      } else {
        this._saveForLater(formData);
      }
    });
  },

  async _sendData(data) {
    try {
      await Api.addNewStory(data);
      alert('Produk berhasil ditambahkan!');
      window.location.hash = '#/products';
    } catch (error) {
      alert(`Gagal menambahkan produk: ${error.message}`);
    }
  },

  async _saveForLater(data) {
    await DatabaseHelper.addStoryToOutbox(data);
    alert('Anda sedang offline. Data akan dikirim saat kembali online.');
    
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('post-story-sync');
      });
    }
    
    window.location.hash = '#/products';
  }
};

export default AddProductPage;
