// src/scripts/pages/register-page.js
import Api from '../data/api'; // Pastikan import Api sudah benar

const RegisterPage = {
  async render() {
    return `
      <div class="form-container">
        <h2>Register</h2>
        <form id="register-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password (minimal 8 karakter)</label>
            <input type="password" id="password" name="password" minlength="8" required>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      try {
        const response = await Api.register({ name, email, password });
        if (!response.error) {
          alert('Registrasi berhasil! Silakan login.');
          window.location.hash = '#/login';
        } else {
          alert('Registrasi gagal: ' + response.message);
        }
      } catch (error) {
        console.error('Error saat registrasi:', error);
        alert('Terjadi kesalahan saat mencoba registrasi.');
      }
    });
  },
};

export default RegisterPage;