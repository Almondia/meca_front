import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { TokenType } from '@/types/domain';
import storage from '@/utils/storageHandler';
import { hasBrowser } from '@/utils/common';
import { hasTokenState } from '@/atoms/common';

const useDetactToken = () => {
  const getToken = useCallback(() => storage.getItem<TokenType>('token'), []);
  const router = useRouter();
  const [hasToken, setHasToken] = useRecoilState<boolean>(hasTokenState);
  useEffect(() => {
    const handleStorageChange = () => {
      setHasToken(!!getToken());
    };
    if (hasBrowser()) {
      window.addEventListener('storage', handleStorageChange);
    }
    return () => {
      if (hasBrowser()) {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasToken(!!getToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return { hasToken };
};

export default useDetactToken;
