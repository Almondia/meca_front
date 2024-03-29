import { User } from '@/types/domain/user';

import UserAvatarEditor from '@/components/user/molecules/UserAvatarEditor';
import UserNameEditor from '@/components/user/molecules/UserNameEditor';
import useProfileUpdate from '@/hooks/user/useProfileUpdate';

import { UserProfileWrapper } from './styled';

// TODO: 본인 외 사용자 조회가 생긴다면 리팩터링
const UserProfileHeader = ({ memberId, name, profile }: User) => {
  const { deleteProfileImage, updateProfileImage, updateProfileName } = useProfileUpdate();
  return (
    <UserProfileWrapper>
      <UserAvatarEditor
        memberId={memberId}
        profile={profile}
        updateProfileImage={updateProfileImage}
        deleteProfileImage={deleteProfileImage}
      />
      <UserNameEditor name={name} updateProfileName={updateProfileName} />
    </UserProfileWrapper>
  );
};

export default UserProfileHeader;
