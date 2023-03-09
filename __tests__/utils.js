import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import themeMode from '../styles/theme';

const Wrapper = ({ children }) => <ThemeProvider theme={themeMode['light']}>{children}</ThemeProvider>;

const renderWithStyledComponent = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithStyledComponent as render };
