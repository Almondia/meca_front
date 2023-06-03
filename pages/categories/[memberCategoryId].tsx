/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { QueryClient } from '@tanstack/react-query';
import { getPlaiceholder } from 'plaiceholder';

import mecaApi from '@/apis/mecaApi';
import LikeButton from '@/components/atoms/LikeButton';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import ListControlGroup from '@/components/molcules/ListControlGroup';
import MecaControl from '@/components/organisms/MecaControl';
import MecaList from '@/components/organisms/MecaList';
import useCategoryLike from '@/hooks/category/useCategoryLike';
import useMecaList from '@/hooks/meca/useMecaList';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { UserProfile } from '@/types/domain';
import { extractFirstImageSrc, getRemoteImageUrl } from '@/utils/imageHandler';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface MyCategoryByIdPageProps {
  categoryId: string;
  isMine: boolean;
  writerInfo: UserProfile;
}

const CategoryById = ({ categoryId, isMine, writerInfo }: MyCategoryByIdPageProps) => {
  const { mecaList, hasNextPage, fetchNextPage } = useMecaList(categoryId, isMine);
  const { user } = useUser();
  const initialLikeCount = mecaList?.pages[0].categoryLikeCount ?? 0;
  const { hasLike, likeCount, postLike } = useCategoryLike(categoryId, initialLikeCount);

  const categoryTitle = mecaList?.pages[0].category.title ?? 'Category Title';
  const categoryThumbnail = mecaList?.pages[0].category.thumbnail;
  return (
    <>
      <MetaHead
        title={categoryTitle}
        description={`${writerInfo.name}님의 MecaSet`}
        image={categoryThumbnail && getRemoteImageUrl(categoryThumbnail)}
      />
      <ListSection>
        <ListControlGroup>
          <ListControlGroup.Left>
            <PageTitle>{categoryTitle}</PageTitle>
          </ListControlGroup.Left>
          <ListControlGroup.Right>
            <LikeButton onClick={postLike} defaultActiveState={hasLike} />
            {likeCount}
          </ListControlGroup.Right>
        </ListControlGroup>
        <br />
        <MecaControl
          categoryId={categoryId}
          categoryTitle={categoryTitle}
          name={writerInfo.name}
          profile={writerInfo.profile || '/images/noprofile.png'}
          isMine={isMine}
          hasAuth={!!user}
        />
        <Devide />
        <MecaList mecaList={mecaList} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isMine={isMine} />
      </ListSection>
    </>
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
    throw { message: '잘못된 페이지 요청' };
  }
  const { uuid1: memberId, uuid2: categoryId } = extractCombinedUUID(memberCategoryId);
  const isMine: boolean = memberId === currentMemberId ?? false;
  const mecaListResponse = await queryClient.fetchInfiniteQuery(
    [queryKey.mecas, categoryId],
    async () => {
      const mecaList = await getMecaList(categoryId, isMine, queryClient);
      const mecaListContentsWithBlurURL = await Promise.all(
        mecaList.contents.map(async (meca) => {
          const thumbnail = extractFirstImageSrc(meca.description);
          if (!thumbnail) {
            return meca;
          }
          const { base64: blurDataURL, img } = await getPlaiceholder(thumbnail, { size: 12 });
          return { ...meca, blurThumbnail: { ...img, blurDataURL } };
        }),
      );
      return { ...mecaList, contents: mecaListContentsWithBlurURL };
    },
    { getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined },
  );
  const writerInfo: UserProfile = isMine
    ? (queryClient.getQueryData<UserProfile>([queryKey.me]) as UserProfile)
    : mecaListResponse.pages[0].contents[0];
  return { categoryId, isMine, writerInfo };
}, true);

export default CategoryById;
