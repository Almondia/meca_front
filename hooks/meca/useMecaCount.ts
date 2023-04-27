import { useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';

const useMecaCount = (categoryId: string) => {
  const { data: mecaCount } = useQuery([queryKey.mecas, categoryId, 'count'], () =>
    mecaApi.getCountByCategoryId(categoryId),
  );
  return { mecaCount };
};

export default useMecaCount;
