import { useEffect } from 'react';

/* XXX: 앞으로가기-뒤로가기 nextjs experimental scroll restoriation 사용하지 않고 커스텀 고려
 */
const useScrollRestoration = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history && window.history.scrollRestoration !== 'auto') {
      window.history.scrollRestoration = 'auto';
    }
  }, []);
};

export default useScrollRestoration;
