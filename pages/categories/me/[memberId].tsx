/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import { getPlaiceholder } from 'plaiceholder';

import categoryApi from '@/apis/categoryApi';
import PageTitle from '@/components/atoms/PageTitle';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/category/useCategory';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import { getRemoteImageUrl } from '@/utils/imageHandler';

const Category = () => {
  const { categoires, hasNextPage, fetchNextPage, changeSearchQuery } = useCategory();
  return (
    <>
      <MetaHead title="내 카테고리 목록" description="로그인 후 이용할 수 있어요!" />
      <ListSection>
        <PageTitle>내 카테고리 목록</PageTitle>
        <CategoryControl onChangeQuery={changeSearchQuery} />
        <Devide />
        <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </ListSection>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  await queryClient.prefetchInfiniteQuery(
    [queryKey.categories, 'me', ''],
    async () => {
      const categoryList = await categoryApi.getMyCategoryList({});
      const categoryListContentWithBlurURL = await Promise.all(
        categoryList.contents.map(async (category) => {
          const { thumbnail } = category;
          if (!thumbnail) {
            return category;
          }
          const { base64: blurDataURL, img } = await getPlaiceholder(getRemoteImageUrl(thumbnail), { size: 12 });
          return { ...category, blurThumbnail: { ...img, blurDataURL } };
        }),
      );
      return { ...categoryList, contents: categoryListContentWithBlurURL };
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );
  const categoryList = queryClient.getQueryData([queryKey.categories, 'me', '']);
  if (categoryList) {
    context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  }
});

export default Category;
