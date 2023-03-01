import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import themeMode, { Theme } from './theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: dark mode toggle 만들어서 전역상태로 처리할 것
  const currentTheme: Theme = themeMode.light;
  return (
    <DefaultThemeProvider theme={currentTheme}>
      <GlobalStyle {...currentTheme} />
      {children}
    </DefaultThemeProvider>
  );
};

export default ThemeProvider;
