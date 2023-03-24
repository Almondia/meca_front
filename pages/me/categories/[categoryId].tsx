/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import useMecaList from '@/hooks/meca/useMecaList';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import PageTitle from '@/components/layout/PageTitle';
import CardControl from '@/components/organisms/CardControl';
import MecaList from '@/components/organisms/MecaList';

export interface MyCategoryByIdPageProps {
  categoryId: string;
  memberId: string;
}

const MyCategoryByIdPage = ({ categoryId, memberId }: MyCategoryByIdPageProps) => {
  const { mecaList, hasNextPage, fetchNextPage } = useMecaList(categoryId, memberId);
  return (
    <ListSection>
      <PageTitle>{mecaList?.pages[0].categoryTitle ?? 'Category Title'}</PageTitle>
      <CardControl categoryId={categoryId} />
      <Devide />
      <MecaList mecaList={mecaList} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isMine />
    </ListSection>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, memberId) => {
  const { categoryId } = context.query;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { url: '/' };
  }
  await queryClient.prefetchInfiniteQuery(
    [queryKey.mecas, memberId],
    () =>
      mecaApi.getMyMecaList({
        categoryId,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );
  return {
    memberId,
    categoryId,
  };
});

export default MyCategoryByIdPage;
