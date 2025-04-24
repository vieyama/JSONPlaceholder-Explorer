type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
}

export function showToast(options: ToastOptions): void {
  const { message, type, duration = 3000 } = options;

  const existingToast = document.getElementById('toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'fixed z-50 max-w-xs p-4 rounded-lg shadow-lg top-4 right-4 animate-fade-in';

  switch (type) {
    case 'success':
      toast.className += ' bg-success-light text-success';
      break;
    case 'error':
      toast.className += ' bg-error-light text-error';
      break;
    case 'warning':
      toast.className += ' bg-warning-light text-warning';
      break;
    case 'info':
      toast.className += ' bg-primary-100 text-primary-700';
      break;
  }

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}