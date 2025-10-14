import L from 'leaflet';

const AboutPage = {
  async render() {
    return `
      <section class="page-section container">
        <div class="about-us__header">
            <h2 class="section-title"><span>Cerita di Balik Jualan Online</span></h2>
        </div>
        <div class="about-us__content">
          <div class="about-us__image">
            <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=500" alt="Tentang Jualan Online">
          </div>
          <div class="about-us__text">
            <h3>Dari Ide Menjadi Kenyataan</h3>
            <p>
              Jualan Online lahir dari sebuah mimpi sederhana: membuat produk berkualitas tinggi dapat diakses oleh semua orang. Kami memulai perjalanan ini pada tahun 2024 dengan keyakinan bahwa pengalaman belanja online haruslah mudah, aman, dan menyenangkan.
            </p>
            <p>
              Setiap produk dalam koleksi kami dipilih dengan cermat untuk memastikan Anda mendapatkan yang terbaik. Kami bukan hanya sekadar toko, kami adalah mitra gaya hidup Anda. Terima kasih telah menjadi bagian dari cerita kami.
            </p>
          </div>
        </div>
      </section>

      <section class="page-section page-section--light">
        <div class="container">
            <h2 class="section-title"><span>Tim Profesional Kami</span></h2>
            <div class="team-list">
            <div class="card team-member">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" alt="Anggota Tim 1">
                <h4>Ahmad Yusuf</h4>
                <p>CEO & Founder</p>
            </div>
            <div class="card team-member">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="Anggota Tim 2">
                <h4>Siti Nurhaliza</h4>
                <p>Chief Marketing Officer</p>
            </div>
            <div class="card team-member">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" alt="Anggota Tim 3">
                <h4>Budi Santoso</h4>
                <p>Head of Operations</p>
            </div>
            </div>
        </div>
      </section>

      <section class="page-section container">
        <h2 class="section-title"><span>Temukan Kami</span></h2>
        <div class="contact-us__content">
          <div class="card contact-us__info">
            <h3>Informasi Kontak</h3>
            <p><strong>Alamat:</strong> Jl. Jendral Sudirman No. 123, Jakarta, Indonesia</p>
            <p><strong>Email:</strong> info@jualanonline.com</p>
            <p><strong>Telepon:</strong> (021) 123-4567</p>
          </div>
          <div id="map" class="contact-us__map"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    console.log('Halaman tentang kami modern telah dirender');

    // Inisialisasi Peta Leaflet
    const map = L.map('map').setView([-6.2088, 106.8456], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([-6.2088, 106.8456]).addTo(map)
      .bindPopup('<b>Jualan Online</b><br>Kantor Pusat Kami.')
      .openPopup();
  },
};

export default AboutPage;