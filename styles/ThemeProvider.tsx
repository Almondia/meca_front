import useCustomTheme from '@/hooks/useCustomTheme';
import { useEffect } from 'react';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import themeMode, { Theme } from './theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, initTheme } = useCustomTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const currentTheme: Theme = themeMode[theme];
  return (
    <DefaultThemeProvider theme={currentTheme}>
      <GlobalStyle {...currentTheme} />
      {children}
    </DefaultThemeProvider>
  );
};

export default ThemeProvider;
