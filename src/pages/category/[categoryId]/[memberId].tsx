/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import PageTitle from '@/components/@common/atoms/PageTitle';
import MetaHead from '@/components/@util/MetaHead';
import CategoryLikeButton from '@/components/category/molecules/CategoryLikeButton';
import MecaList from '@/components/meca/organisms/MecaList';
import MecaListHeader from '@/components/meca/organisms/MecaListHeader';
import useMecaList from '@/hooks/meca/useMecaList';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';
import { getRemoteImageUrl } from '@/utils/imageHandler';

export interface CategoryByIdProps {
  categoryId: string;
  isMine: boolean;
}

const CategoryDetailByMemberId = ({ categoryId, isMine }: CategoryByIdProps) => {
  const { mecaList, hasNextPage, fetchNextPage, isEmpty } = useMecaList(categoryId, isMine);
  const { category, member: writerInfo } = mecaList;
  const { user } = useUser();
  return (
    <>
      <MetaHead
        title={category?.title}
        description={`${writerInfo?.name}님의 MecaSet`}
        image={category?.thumbnail && getRemoteImageUrl(category.thumbnail)}
      />
      <ListPageLayout>
        <PageTitle style={{ marginBottom: '8px' }}>{category.title}</PageTitle>
        <CategoryLikeButton categoryId={categoryId} initialLikeCount={mecaList.categoryLikeCount} />
        <MecaListHeader
          categoryId={categoryId}
          categoryTitle={category.title}
          name={writerInfo.name}
          profile={writerInfo?.profile || '/images/noprofile.png'}
          isMine={isMine}
          hasAuth={!!user}
        />
        <Devide />
        <MecaList
          mecaList={mecaList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isMine={isMine}
          isEmpty={isEmpty}
        />
      </ListPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, currentMemberId) => {
  const memberId = context.params?.memberId;
  const categoryId = context.params?.categoryId;
  if (typeof memberId !== 'string' || typeof categoryId !== 'string') {
    throw { message: '잘못된 페이지 요청' };
  }
  const isMine: boolean = memberId === currentMemberId ?? false;
  await useMecaList.fetchInfiniteQuery(categoryId, isMine, queryClient);
  return { categoryId, isMine, cached: true };
}, true);

export default CategoryDetailByMemberId;
