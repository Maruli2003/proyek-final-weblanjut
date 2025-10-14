// src/scripts/routes/routes.js
import HomePage from '../pages/home/home-page.js';
import AboutPage from '../pages/about/about-page.js';
import ProductsPage from '../pages/products-page.js';
import AddProductPage from '../pages/add-product-page.js';
import LoginPage from '../pages/login-page.js';
import RegisterPage from '../pages/register-page.js';

const routes = {
  '/': HomePage,
  '/products': ProductsPage,
  '/add-product': AddProductPage,
  '/about': AboutPage,
  '/login': LoginPage,
  '/register': RegisterPage,
};

export default routes;