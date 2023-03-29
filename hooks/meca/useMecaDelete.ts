import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';
import mecaApi from '@/apis/mecaApi';

const useMecaDelete = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMeca } = useMutation(mecaApi.deleteMeca, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([queryKey.mecas]);
      queryClient.setQueryData([queryKey.meca, variables], null);
      alertToast('삭제 완료', 'success');
    },
  });

  return { deleteMeca };
};

export default useMecaDelete;
