import 'jest-styled-components';
import { render } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil';
import { generateQueryClient } from '@/query/queryClient';
import { QueryClientProvider, hydrate } from '@tanstack/react-query';
import ThemeProvider from '@/styles/ThemeProvider';
import commonTheme from '@/styles/theme';
import { useEffect } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

export const createQueryClientWrapper = (client) => {
  const queryClient = client ?? generateQueryClient();
  return ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const RecoilObserver = ({ node, defaultValue }) => {
  const value = useRecoilValue(node);
  const setValue = useSetRecoilState(node);
  useEffect(() => setValue(defaultValue), []);
  return null;
};

const Wrapper = ({ children }) => (
  <MemoryRouterProvider>
    <RecoilRoot>
      <ThemeProvider theme={commonTheme}>
        <ToastContainer />
        {children}
      </ThemeProvider>
    </RecoilRoot>
  </MemoryRouterProvider>
);

function renderWithQueryClient(ui, options, client, dehydratedState) {
  const queryClient = client ?? generateQueryClient();
  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, { wrapper: Wrapper, ...options });
}

const renderWithUIComponents = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithUIComponents as render };
export { renderWithQueryClient as renderQuery };
