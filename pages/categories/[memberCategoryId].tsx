/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { QueryClient } from '@tanstack/react-query';
import { getPlaiceholder } from 'plaiceholder';

import mecaApi from '@/apis/mecaApi';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import MecaControl from '@/components/organisms/MecaControl';
import MecaList from '@/components/organisms/MecaList';
import useMecaList from '@/hooks/meca/useMecaList';
import useUser from '@/hooks/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { UserProfile } from '@/types/domain';
import { extractFirstImageSrc } from '@/utils/imageHandler';
import { extractCombinedUUID } from '@/utils/uuidHandler';

export interface MyCategoryByIdPageProps {
  categoryId: string;
  isMine: boolean;
}

const CategoryById = ({ categoryId, isMine }: MyCategoryByIdPageProps) => {
  const { mecaList, hasNextPage, fetchNextPage } = useMecaList(categoryId, isMine);
  const { user } = useUser();
  const categoryTitle = mecaList?.pages[0].category.title ?? 'Category Title';
  const username = (isMine ? user?.name : mecaList?.pages[0]?.contents[0]?.name) || 'username';
  const categoryThumbnail = mecaList?.pages[0].category.thumbnail;
  return (
    <>
      <MetaHead title={categoryTitle} description={`${username}님의 MecaSet`} image={categoryThumbnail} />
      <ListSection>
        <PageTitle>{categoryTitle}</PageTitle>
        <MecaControl
          categoryId={categoryId}
          categoryTitle={categoryTitle}
          name={username}
          profile={(isMine ? user?.profile : mecaList?.pages[0]?.contents[0]?.profile) || '/images/noprofile.png'}
          isMine={isMine}
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
    throw { url: '/' };
  }
  const { uuid1: memberId, uuid2: categoryId } = extractCombinedUUID(memberCategoryId);
  const isMine: boolean = memberId === currentMemberId ?? false;
  await queryClient.fetchInfiniteQuery(
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
      return {
        ...mecaList,
        contents: mecaListContentsWithBlurURL,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext,
    },
  );
  return { categoryId, isMine };
}, true);

export default CategoryById;
