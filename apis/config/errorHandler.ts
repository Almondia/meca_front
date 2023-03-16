import alertToast from '@/utils/toastHandler';

const axiosErrorHandler = (error: any, axiosHandler?: () => void, commonHandler?: () => void) => {
  if (error.status === 400) {
    axiosHandler ? axiosHandler() : alertToast(error.message, 'warning');
    return;
  }
  if (!commonHandler) {
    console.log(error);
    alertToast('알 수 없는 오류 발생', 'warning');
  }
};

export default axiosErrorHandler;
