const NotificationHelper = {
  init({ button, vapidKey }) {
    this._button = button;
    this._vapidKey = vapidKey;

    if (!this._isNotificationSupported()) {
      console.log('Fitur notifikasi tidak didukung di browser ini.');
      this._button.style.display = 'none';
      return;
    }

    this._button.addEventListener('click', this._handleButtonClick.bind(this));
    this._updateButtonState();
  },

  _isNotificationSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
  },

  async _handleButtonClick() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const isSubscribed = await this._isSubscribed();
      if (isSubscribed) {
        await this._unsubscribe();
      } else {
        await this._subscribe();
      }
      this._updateButtonState();
    }
  },
  
  async _isSubscribed() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  },

  async _subscribe() {
    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(this._vapidKey),
      });
      console.log('Berhasil berlangganan notifikasi:', subscription);
      // Di aplikasi nyata, Anda akan mengirim `subscription` ke server Anda di sini.
    } catch (error) {
      console.error('Gagal berlangganan notifikasi:', error);
    }
  },

  async _unsubscribe() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      console.log('Berhasil berhenti berlangganan.');
    }
  },

  async _updateButtonState() {
    const isSubscribed = await this._isSubscribed();
    const icon = this._button.querySelector('i');
    if (isSubscribed) {
      icon.className = 'fas fa-bell';
      this._button.setAttribute('aria-label', 'Nonaktifkan Notifikasi');
    } else {
      icon.className = 'far fa-bell-slash';
      this._button.setAttribute('aria-label', 'Aktifkan Notifikasi');
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;
