import { useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useSetRecoilState } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import MecaList from '@/components/meca/organisms/MecaList';
import useMecaList from '@/hooks/meca/useMecaList';
import {
  mockedDeleteMecaApi,
  mockedGetAuthUserMecaListApi,
  mockedGetMecaCountApi,
  mockedGetUserWithServerApi,
} from '@/mock/api';
import { MOCK_CATEGORY_ID } from '@/mock/data';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/meca/MecaList',
  component: MecaList,
  parameters: {
    componentSubtitle: '카테고리에 대한 카드 목록 컴포넌트',
    controls: {
      exclude: ['fetchNextPage', 'mecaList'],
    },
  },
} as ComponentMeta<typeof MecaList>;

const Template: ComponentStory<typeof MecaList> = (args) => <MecaList {...args} />;

export const Default = ({ isMine, hasNextPage }: { isMine: boolean; hasNextPage: boolean }) => {
  const setHasAuth = useSetRecoilState(hasAuthState);
  useEffect(() => {
    implementWorker([
      restHandler(mockedGetUserWithServerApi),
      restHandler(() => mockedGetMecaCountApi(50)),
      restHandler(mockedGetAuthUserMecaListApi),
      restHandler(mockedDeleteMecaApi),
    ]);
    setHasAuth(true);
    return () => {
      setHasAuth(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { mecaList, fetchNextPage, hasNextPage: hasMockedNextPage } = useMecaList(MOCK_CATEGORY_ID, true);
  return (
    <Template
      mecaList={mecaList}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage && hasMockedNextPage}
      isMine={isMine}
    />
  );
};

export const Empty = Template.bind({});
Empty.args = {
  hasNextPage: false,
  isMine: true,
  isEmpty: true,
};
