import { useEffect, useState } from 'react';

import { ThemeType } from '@/types/common';
import storage from '@/utils/storageHandler';

const useCustomTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const toggleTheme = () => {
    const changedTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
    storage.setItem('theme', changedTheme);
    document.documentElement.dataset.theme = changedTheme;
    setTheme(changedTheme);
  };

  useEffect(() => {
    const currentTheme = storage.getItem<ThemeType>('theme', 'light') ?? 'light';
    storage.setItem('theme', currentTheme);
    setTheme(currentTheme);
  }, []);

  return { theme, toggleTheme };
};

export default useCustomTheme;
