/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { useMemo } from 'react';

import PageTitle from '@/components/@common/atoms/PageTitle';
import BetweenControlGroup from '@/components/@common/molecules/BetweenControlGroup';
import LikeButton from '@/components/@common/molecules/LikeButton';
import MetaHead from '@/components/@util/MetaHead';
import MecaControl from '@/components/meca/organisms/MecaControl';
import MecaList from '@/components/meca/organisms/MecaList';
import useCategoryLike from '@/hooks/category/useCategoryLike';
import useMecaList from '@/hooks/meca/useMecaList';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, ListPageLayout } from '@/styles/layout';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface CategoryByIdProps {
  categoryId: string;
  isMine: boolean;
}

const CategoryById = ({ categoryId, isMine }: CategoryByIdProps) => {
  const { mecaList, hasNextPage, fetchNextPage, isEmpty } = useMecaList(categoryId, isMine);
  const { category, member: writerInfo } = mecaList;
  const { user } = useUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialLikeCount = useMemo(() => mecaList.categoryLikeCount ?? 0, []);
  const { hasLike, likeCount, postLike } = useCategoryLike(categoryId, initialLikeCount);
  return (
    <>
      <MetaHead
        title={category?.title}
        description={`${writerInfo?.name}님의 MecaSet`}
        image={category?.thumbnail && getRemoteImageUrl(category.thumbnail)}
      />
      <ListPageLayout>
        <BetweenControlGroup>
          <BetweenControlGroup.Left>
            <PageTitle>{category?.title}</PageTitle>
          </BetweenControlGroup.Left>
          <BetweenControlGroup.Right>
            <LikeButton
              buttonName={`${category?.title} 카테고리 추천 버튼`}
              onClick={postLike}
              defaultActiveState={hasLike}
              disabled={!user}
            />
            {likeCount}
          </BetweenControlGroup.Right>
        </BetweenControlGroup>
        <br />
        <MecaControl
          categoryId={categoryId}
          categoryTitle={category?.title ?? 'category'}
          name={writerInfo?.name ?? 'writer name'}
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
  const memberCategoryId = context.params?.memberCategoryId;
  if (!memberCategoryId || typeof memberCategoryId !== 'string') {
    throw { message: '잘못된 페이지 요청' };
  }
  const { uuid1: memberId, uuid2: categoryId } = extractCombinedUUID(memberCategoryId);
  const isMine: boolean = memberId === currentMemberId ?? false;
  await useMecaList.fetchInfiniteQuery(categoryId, isMine, queryClient);
  return { categoryId, isMine };
}, true);

export default CategoryById;
