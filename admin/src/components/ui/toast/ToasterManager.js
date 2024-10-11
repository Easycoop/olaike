class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
  }

  addToast(toast) {
    this.toasts.push(toast);
    this.notifyListeners();
  }

  removeToast(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }
}

const toastManager = new ToastManager();
export default toastManager;
