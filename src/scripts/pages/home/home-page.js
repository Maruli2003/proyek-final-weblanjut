const HomePage = {
  async render() {
    return `
      <section class="hero">
        <div class="hero__inner container">
          <h1 class="hero__title">Temukan Gaya Anda Bersama Kami</h1>
          <p class="hero__tagline">Koleksi pilihan untuk setiap momen berharga Anda. Kualitas premium, harga terjangkau.</p>
          <a href="#/products" class="button button--primary">Belanja Sekarang</a>
        </div>
      </section>

      <section class="page-section container">
        <h2 class="section-title"><span>Produk Pilihan</span></h2>
        <div class="product-list">
          <div class="card product-item">
            <div class="card__image-container">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" alt="Jam Tangan Elegan" class="card__image">
            </div>
            <div class="card__content">
              <h3 class="product-item__title">Jam Tangan Elegan</h3>
              <p class="product-item__price">Rp 750.000</p>
            </div>
          </div>
          <div class="card product-item">
            <div class="card__image-container">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" alt="Headphone Premium" class="card__image">
            </div>
            <div class="card__content">
              <h3 class="product-item__title">Headphone Premium</h3>
              <p class="product-item__price">Rp 1.250.000</p>
            </div>
          </div>
          <div class="card product-item">
            <div class="card__image-container">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" alt="Sepatu Lari Cepat" class="card__image">
            </div>
            <div class="card__content">
              <h3 class="product-item__title">Sepatu Lari Cepat</h3>
              <p class="product-item__price">Rp 980.000</p>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section page-section--light">
        <div class="container">
          <h2 class="section-title"><span>Mengapa Memilih Kami?</span></h2>
          <div class="services-list">
            <div class="card service-item">
              <div class="card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8.5 5.5a.5.5 0 0 0-1 0v3.354l-1.427 1.427a.5.5 0 0 0 .707.707l1.5-1.5a.5.5 0 0 0 .146-.353V5.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
              </div>
              <h3>Pengiriman Cepat</h3>
              <p>Pesanan Anda tiba di depan pintu dalam waktu singkat.</p>
            </div>
            <div class="card service-item">
              <div class="card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
              </div>
              <h3>Kualitas Terjamin</h3>
              <p>Hanya produk dengan standar kualitas tertinggi.</p>
            </div>
            <div class="card service-item">
              <div class="card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>
              </div>
              <h3>Layanan 24/7</h3>
              <p>Tim dukungan kami selalu siap membantu Anda.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dijalankan setelah render()
    console.log('Halaman beranda yang dirapikan telah dirender');
  },
};

export default HomePage;