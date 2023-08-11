import type { MyProfile } from '@/types/domain/user';

import RelativeDate from '@/components/@common/atoms/RelativeDate';
import PostSubInfo from '@/components/@common/molecules/PostSubInfo';
import { TextCaption } from '@/styles/common';

type UserBasicInfoProps = MyProfile | null | undefined;

const UserBasicInfo = (user: UserBasicInfoProps) => {
  if (!user) {
    return null;
  }
  const { email, oauthType, createdAt } = user;
  return (
    <PostSubInfo columnGutter="12px" rowGutter="12px">
      <PostSubInfo.Content title="Email">
        <TextCaption>{email}</TextCaption>
      </PostSubInfo.Content>
      <PostSubInfo.Content title="가입일">
        <TextCaption>
          <RelativeDate date={createdAt} />
        </TextCaption>
      </PostSubInfo.Content>
      <PostSubInfo.Content title="SNS">
        <TextCaption>{oauthType}</TextCaption>
      </PostSubInfo.Content>
    </PostSubInfo>
  );
};

export default UserBasicInfo;
