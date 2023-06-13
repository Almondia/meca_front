import { ComponentMeta } from '@storybook/react';

import Navigation from '@/components/organisms/Navigation';
import { mockedGetUserWithServerApi, mockedPostLogoutApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/organisms/Navigation',
  component: Navigation,
  parameters: {
    componentSubtitle: '상단 네비게이션',
  },
} as ComponentMeta<typeof Navigation>;

export const NoAuth = () => {
  implementWorker([restHandler(() => mockedGetUserWithServerApi(null))]);
  return <Navigation />;
};

export const WithAuth = () => {
  implementWorker([restHandler(mockedGetUserWithServerApi), restHandler(mockedPostLogoutApi)]);
  return <Navigation />;
};
