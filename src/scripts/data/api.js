class Api {
  static BASE_URL = 'https://story-api.dicoding.dev/v1';

  /**
   * Menyimpan token otorisasi ke localStorage.
   * @param {string} token Token otorisasi.
   */
  static #putAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Mengambil token otorisasi dari localStorage.
   * @returns {string | null} Token otorisasi atau null jika tidak ada.
   */
  static #getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Menghapus token otorisasi dari localStorage.
   */
  static logout() {
    localStorage.removeItem('authToken');
  }

  /**
   * Melakukan registrasi pengguna baru.
   * @param {object} params Parameter registrasi.
   * @param {string} params.name Nama pengguna.
   * @param {string} params.email Email pengguna.
   * @param {string} params.password Password pengguna.
   * @returns {Promise<object>} Hasil dari API.
   */
  static async register({ name, email, password }) {
    const response = await fetch(`${this.BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  }

  /**
   * Melakukan login pengguna.
   * @param {object} params Parameter login.
   * @param {string} params.email Email pengguna.
   * @param {string} params.password Password pengguna.
   * @returns {Promise<object>} Hasil dari API.
   */
  static async login({ email, password }) {
    const response = await fetch(`${this.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!responseJson.error) {
      // Simpan token jika login berhasil
      this.#putAuthToken(responseJson.loginResult.token);
    }

    return responseJson;
  }

  /**
   * Mengambil semua cerita dari API.
   * @returns {Promise<object[]>} Daftar cerita.
   */
  static async getAllStories() {
    const token = this.#getAuthToken();
    if (!token) {
      throw new Error("Token otorisasi tidak ditemukan. Silakan login terlebih dahulu.");
    }

    try {
      const response = await fetch(`${this.BASE_URL}/stories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.listStory;
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }

  /**
   * Menambahkan cerita baru.
   * @param {object} params Parameter cerita baru.
   * @param {string} params.description Deskripsi cerita.
   * @param {File} params.photo Foto cerita.
   * @param {number} params.lat Lintang lokasi.
   * @param {number} params.lon Bujur lokasi.
   * @returns {Promise<object>} Hasil dari API.
   */
  static async addNewStory({ description, photo, lat, lon }) {
    const token = this.#getAuthToken();
    if (!token) {
      throw new Error("Token otorisasi tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('lat', lat);
    formData.append('lon', lon);

    try {
      const response = await fetch(`${this.BASE_URL}/stories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson;
    } catch (error) {
      console.error('Error adding new story:', error);
      throw error;
    }
  }
}

export default Api;