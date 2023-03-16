import { useQueryClient } from '@tanstack/react-query';

import categoryApi from '@/apis/categoryApi';
import axiosErrorHandler from '@/apis/config/errorHandler';
import queryKey from '@/query/queryKey';

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  const addCategory = async (title: string) => {
    try {
      await categoryApi.addCategory({ title });
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      return true;
    } catch (e) {
      axiosErrorHandler(e);
      return false;
    }
  };

  return { addCategory };
};

export default useCategoryUpdate;
