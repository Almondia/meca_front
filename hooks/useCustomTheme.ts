import themeState, { ThemeType } from '@/atoms/common';
import storage from '@/utils/storageHandler';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

const useCustomTheme = () => {
  const [theme, setTheme] = useRecoilState<ThemeType>(themeState);

  const toggleTheme = () => {
    const changedTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
    storage.setItem('theme', changedTheme);
    setTheme(changedTheme);
  };

  const initTheme = useCallback(() => {
    const currentTheme = storage.getItem<ThemeType>('theme', 'light') ?? 'light';
    storage.setItem('theme', currentTheme);
    setTheme(currentTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { theme, toggleTheme, initTheme };
};

export default useCustomTheme;
