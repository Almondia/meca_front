import { toast, ToastOptions } from 'react-toastify';

const alertToast = (message: string, type: 'info' | 'success' | 'warning', options?: ToastOptions) => {
  const dismissToast = () => {
    toast.dismiss();
  };

  const notify = () => {
    dismissToast();
    toast[type](message, {
      ...options,
    });
  };

  return notify();
};

export default alertToast;
