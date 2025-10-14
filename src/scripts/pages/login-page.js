// src/scripts/pages/login-page.js
import Api from '../data/api'; // Pastikan import Api sudah benar

const LoginPage = {
  async render() {
    return `
      <div class="form-container">
        <h2>Login</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;

      try {
        const response = await Api.login({ email, password });
        if (!response.error) {
          alert('Login berhasil!');
          console.log('Login berhasil:', response);
          // Arahkan ke halaman lain, misalnya halaman utama
          window.location.hash = '#/';
          window.location.reload(); // Refresh untuk update UI (misal: tombol logout)
        } else {
          alert('Login gagal: ' + response.message);
        }
      } catch (error) {
        console.error('Error saat login:', error);
        alert('Terjadi kesalahan saat mencoba login.');
      }
    });
  },
};

export default LoginPage;