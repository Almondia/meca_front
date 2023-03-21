import axios from 'axios';
import { useCallback } from 'react';

import { hasBrowser } from '@/utils/common';

const useLogout = () => {
  const logout = useCallback(async () => {
    const { data } = await axios.get('/api/logout');
    if (data.deleted) {
      if (hasBrowser()) {
        window.location.href = '/';
      }
    }
  }, []);

  return { logout };
};

export default useLogout;
