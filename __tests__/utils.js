import 'jest-styled-components';
import { render } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { generateQueryClient } from '@/query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from '@/styles/ThemeProvider';
import commonTheme from '@/styles/theme';

export const createQueryClientWrapper = () => {
  const queryClient = generateQueryClient();
  return ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const Wrapper = ({ children }) => (
  <RecoilRoot>
    <ThemeProvider theme={commonTheme}>
      <ToastContainer />
      {children}
    </ThemeProvider>
  </RecoilRoot>
);

function renderWithQueryClient(ui, options, client) {
  const queryClient = client ?? generateQueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, { wrapper: Wrapper, ...options });
}

const renderWithUIComponents = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithUIComponents as render };
export { renderWithQueryClient as renderQuery };
