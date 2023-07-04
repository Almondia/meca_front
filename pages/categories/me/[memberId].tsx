/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import categoryApi from '@/apis/categoryApi';
import PageTitle from '@/components/atoms/PageTitle';
import AuthPageProvider from '@/components/common/AuthPageProvider';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useCategory from '@/hooks/category/useCategory';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { getNextImageUrl, getPlaceholderImage } from '@/utils/plaiceholderHandler';

const Category = () => {
  const { categoires, hasNextPage, fetchNextPage, changeSearchQuery } = useCategory();
  return (
    <AuthPageProvider>
      <MetaHead title="내 카테고리 목록" description="로그인 후 이용할 수 있어요!" />
      <ListSection>
        <PageTitle>내 카테고리 목록</PageTitle>
        <CategoryControl onChangeQuery={changeSearchQuery} />
        <Devide />
        <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </ListSection>
    </AuthPageProvider>
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
          const originRemoteImage = getRemoteImageUrl(thumbnail);
          const placeholderThumbnail = await getPlaceholderImage(getNextImageUrl(originRemoteImage), 12);
          if (!placeholderThumbnail) {
            return category;
          }
          const { blurDataURL, img } = placeholderThumbnail;
          return { ...category, blurThumbnail: { ...img, src: originRemoteImage, blurDataURL } };
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
