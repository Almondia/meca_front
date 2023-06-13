import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadSpinner from '@/components/atoms/LoadSpinner';
import UserProfileHeader from '@/components/organisms/UserProfileHeader';
import useUser from '@/hooks/user/useUser';
import {
  mockedGetPresignImageUrlApi,
  mockedGetUserWithServerApi,
  mockedPutImageUploadApi,
  mockedPutUserApi,
} from '@/mock/api';
import { MOCK_MEMBER } from '@/mock/data';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

const baseProfileUrl = 'https://avatars.githubusercontent.com/u/76927397?v=4';
const changedProfileUrl = 'https://avatars.githubusercontent.com/u/76927397?v=4';

export default {
  title: 'components/organisms/UserProfileHeader',
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
    restOverridedResponseHandler(mockedGetPresignImageUrlApi, {
      url: changedProfileUrl,
      objectKey: changedProfileUrl,
    }),
    restHandler(() => mockedPutImageUploadApi(changedProfileUrl)),
  ]);
  const { user } = useUser();
  if (!user) {
    return <LoadSpinner width="100%" height="200px" />;
  }
  return <UserProfileHeader {...user} />;
};

export const Default = Template.bind({});
Default.args = {
  isMe: true,
};
