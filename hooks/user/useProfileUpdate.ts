import { useMutation, useQueryClient } from '@tanstack/react-query';

import userApi from '@/apis/userApi';
import queryKey from '@/query/queryKey';
import { MyProfile } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile } = useMutation(userApi.updateProfile, {
    onMutate: async ({ name, profile }) => {
      await queryClient.cancelQueries({ queryKey: [queryKey.me] });
      const previousUser = queryClient.getQueryData<MyProfile>([queryKey.me]);
      if (previousUser) {
        queryClient.setQueryData([queryKey.me], {
          ...previousUser,
          name: name ?? previousUser.name,
          profile: profile ?? previousUser.profile,
        });
      }
      return { previousUser };
    },
    onError: (err: any, _, context) => {
      alertToast(err?.message ?? '프로필 수정 실패', 'warning');
      queryClient.setQueryData([queryKey.me], context?.previousUser);
    },
  });
  return { updateProfile };
};

export default useProfileUpdate;
