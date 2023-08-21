import { useEffect } from 'react';

/* XXX: 앞으로가기-뒤로가기 nextjs experimental scroll restoriation 동작이 잘 안될 경우 커스텀을 고려
 */
const useScrollRestoration = () => {
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return;
    }
    const entries = performance.getEntriesByType('navigation')[0];
    const entriesNavigationTiming = entries as PerformanceNavigationTiming;
    if (entriesNavigationTiming.type === 'reload') {
      window.history.scrollRestoration = 'auto';
      setTimeout(() => {
        window.history.scrollRestoration = 'manual';
      }, 1000);
    }
  }, []);
};

export default useScrollRestoration;
