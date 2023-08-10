import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import UserProfileHeader from '@/components/user/organisms/UserProfileHeader';
import useUser from '@/hooks/user/useUser';
import { mockedGetUserWithServerApi, mockedPutUserApi } from '@/mock/api';
import { MOCK_MEMBER } from '@/mock/data';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

const baseProfileUrl = 'https://avatars.githubusercontent.com/u/76927397?v=4';

export default {
  title: 'components/user/UserProfileHeader',
  component: UserProfileHeader,
} as ComponentMeta<typeof UserProfileHeader>;

const Template: ComponentStory<typeof UserProfileHeader> = () => {
  implementWorker([
    restHandler(() =>
      mockedGetUserWithServerApi({
        ...MOCK_MEMBER,
        name: '박동섞',
        profile: baseProfileUrl,
      }),
    ),
    restHandler(mockedPutUserApi),
  ]);
  const { user } = useUser();
  if (!user) {
    return <LoadSpinner width="100%" height="200px" />;
  }
  return <UserProfileHeader {...user} />;
};

export const Default = Template.bind({});
Default.args = {};
