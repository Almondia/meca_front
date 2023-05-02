/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { QueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/layout/PageTitle';
import MecaControl from '@/components/organisms/MecaControl';
import MecaList from '@/components/organisms/MecaList';
import useMecaList from '@/hooks/meca/useMecaList';
import useUser from '@/hooks/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { UserProfile } from '@/types/domain';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface MyCategoryByIdPageProps {
  categoryId: string;
  isMine: boolean;
}

const CategoryById = ({ categoryId, isMine }: MyCategoryByIdPageProps) => {
  const { mecaList, hasNextPage, fetchNextPage } = useMecaList(categoryId, isMine);
  const { user } = useUser();
  return (
    <ListSection>
      <PageTitle>{mecaList?.pages[0].category.title ?? 'Category Title'}</PageTitle>
      <MecaControl
        categoryId={categoryId}
        categoryTitle={mecaList?.pages[0].category.title ?? 'Category Title'}
        name={(isMine ? user?.name : mecaList?.pages[0]?.contents[0]?.name) || 'username'}
        profile={(isMine ? user?.profile : mecaList?.pages[0]?.contents[0]?.profile) || '/images/noprofile.png'}
        isMine={isMine}
      />
      <Devide />
      <MecaList mecaList={mecaList} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isMine={isMine} />
    </ListSection>
  );
};

const getMecaList = async (categoryId: string, isMine: boolean, queryClient: QueryClient) => {
  if (isMine) {
    const user = queryClient.getQueryData([queryKey.me]) as UserProfile;
    const response = await mecaApi.getMyMecaList({ categoryId });
    return { ...response, contents: response.contents.map((content) => ({ ...content, ...user })) };
  }
  return mecaApi.getSharedMecaList({ categoryId });
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, currentMemberId) => {
  const memberCategoryId = context.params?.memberCategoryId;
  if (!memberCategoryId || typeof memberCategoryId !== 'string') {
    throw { url: '/' };
  }
  const { uuid1: memberId, uuid2: categoryId } = extractCombinedUUID(memberCategoryId);
  const isMine: boolean = memberId === currentMemberId ?? false;
  await queryClient.fetchInfiniteQuery(
    [queryKey.mecas, categoryId],
    () => getMecaList(categoryId, isMine, queryClient),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );
  return { categoryId, isMine };
}, true);

export default CategoryById;
