import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import { Theme } from './theme';

const ThemeProvider = ({ theme, children }: { theme: Theme; children: React.ReactNode }) => (
  <DefaultThemeProvider theme={theme}>
    <GlobalStyle {...theme} />
    {children}
  </DefaultThemeProvider>
);

export default ThemeProvider;
