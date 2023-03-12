import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import themeMode from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

const Wrapper = ({ children }) => (
  <RecoilRoot>
    <ThemeProvider theme={themeMode['light']}>
      <ToastContainer />
      {children}
    </ThemeProvider>
  </RecoilRoot>
);

const renderWithUIComponents = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithUIComponents as render };
