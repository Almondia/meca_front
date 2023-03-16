import * as NextImage from 'next/image';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import ThemeProvider from '../styles/ThemeProvider';
import { themeState } from '../atoms/common';
import { DecoratorFn } from '@storybook/react';
import React from 'react';
import '../styles/font.css';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '100%',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '100%',
    },
  },
  pc: {
    name: 'Desktop',
    styles: {
      width: '1440px',
      height: '100%',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const ThemeChanger = ({ theme }) => {
  const setThemeStatus = useSetRecoilState(themeState);
  setThemeStatus(theme);
  return <></>;
};

const withDecorator: DecoratorFn = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeChanger theme={theme} />
        <ThemeProvider>
          <StoryFn />
        </ThemeProvider>{' '}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export const decorators = [withDecorator];
