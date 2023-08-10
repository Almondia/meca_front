import { useRecoilState } from 'recoil';

import { isGlobalLoadingState } from '@/atoms/common';

const useGlobalLoading = () => {
  const [isGlobalLoading, setIsGlobalLoading] = useRecoilState(isGlobalLoadingState);

  const asyncCallbackLoader = async <R>(callback: () => Promise<R>) => {
    setIsGlobalLoading(true);
    try {
      const response = await callback();
      return response;
    } catch (e) {
      throw e;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const startLoading = () => {
    setIsGlobalLoading(true);
  };

  const endLoading = () => {
    setIsGlobalLoading(false);
  };

  return { isGlobalLoading, startLoading, endLoading, asyncCallbackLoader };
};

export default useGlobalLoading;
