const alertToast = (message: string, type: 'info' | 'success' | 'warning') => {
  const notify = () => {
    (async () => {
      const { toast } = await import('react-toastify');
      toast.dismiss();
      toast[type](message);
    })();
  };

  return notify();
};

export default alertToast;
