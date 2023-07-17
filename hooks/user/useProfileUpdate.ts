/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import userApi from '@/apis/userApi';
import queryKey from '@/query/queryKey';
import { MyProfile } from '@/types/domain';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import alertToast from '@/utils/toastHandler';

import useFetchImage from '../useFetchImage';

const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  const { uploadImage } = useFetchImage();

  const { mutate: mutateUserProfile } = useMutation(['updateuser'], userApi.updateProfile, {
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
      queryClient.setQueryData([queryKey.me], context?.previousUser);
      alertToast(err?.message ?? '프로필 수정 실패', 'warning');
    },
  });

  const updateProfileImage = useCallback((image: string | File | undefined) => {
    if (!image || typeof image === 'string') {
      return;
    }
    (async () => {
      const newProfile = await uploadImage(
        { purpose: 'profile', extension: 'png', fileName: Date.now().toString() },
        image,
      );
      newProfile && mutateUserProfile({ profile: getRemoteImageUrl(newProfile) });
    })();
  }, []);

  const deleteProfileImage = useCallback(() => {
    mutateUserProfile({ profile: '' });
  }, []);

  const updateProfileName = useCallback((name: string) => {
    mutateUserProfile({ name });
  }, []);

  return { updateProfileName, updateProfileImage, deleteProfileImage };
};

export default useProfileUpdate;
