import '../styles/styles.css';
import App from './pages/app';
import NotificationHelper from './utils/notification-helper';

const app = new App({
  content: document.querySelector('#main-content'),
  drawerButton: document.querySelector('#drawer-button'),
  navigationDrawer: document.querySelector('#navigation-drawer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  await app.renderPage();
  
  // Inisialisasi notifikasi setelah halaman dimuat
  const notificationToggle = document.querySelector('#notification-toggle');
  NotificationHelper.init({
    button: notificationToggle,
    vapidKey: 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk',
  });
});
