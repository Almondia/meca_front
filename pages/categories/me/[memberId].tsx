/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import categoryApi from '@/apis/categoryApi';
import PageTitle from '@/components/atoms/PageTitle';
import Selection from '@/components/atoms/Selection';
import AuthPageProvider from '@/components/common/AuthPageProvider';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import useMyCategory from '@/hooks/category/useMyCategory';
import useMyRecommendedCategory from '@/hooks/category/useMyRecommendedCategory';
import useQueryRouter from '@/hooks/useQueryRouter';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { getNextImageUrl, getPlaceholderImage } from '@/utils/plaiceholderHandler';

interface CategoryProps {
  isRecommendedRequest?: boolean;
}

const RECOMMEND_QUERY = { recommended: 'true' } as const;

const Category = ({ isRecommendedRequest }: CategoryProps) => {
  const { recommended, replaceWithQuery } = useQueryRouter<'recommended'>(isRecommendedRequest ? RECOMMEND_QUERY : {});
  const myCategoryHook = useMyCategory(!recommended);
  const myRecommendedCategoryHook = useMyRecommendedCategory(!!recommended);
  const { categoires, fetchNextPage, hasNextPage, query, changeSearchQuery } = recommended
    ? myRecommendedCategoryHook
    : myCategoryHook;
  return (
    <AuthPageProvider>
      <MetaHead title="내 카테고리 목록" description="로그인 후 이용할 수 있어요!" />
      <ListSection>
        <PageTitle>{recommended ? '추천한 카테고리' : '내 카테고리'}</PageTitle>
        <CategoryControl query={query} onChangeQuery={changeSearchQuery} />
        <Devide />
        <Selection
          initialSelectedIndex={recommended ? 1 : 0}
          innerTexts={['작성 목록', '추천 목록']}
          onClicks={[
            () => !!recommended && replaceWithQuery({}),
            () => !recommended && replaceWithQuery(RECOMMEND_QUERY),
          ]}
        />
        <CategoryList categoryList={categoires} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </ListSection>
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const recommended = context?.query?.recommended;
  const isRecommendedRequest = recommended === 'true';
  const categoriesKey = isRecommendedRequest
    ? [queryKey.categories, 'me', 'recommended', '']
    : [queryKey.categories, 'me', ''];
  const getCategoryQueryFn = isRecommendedRequest
    ? categoryApi.getMyRecommendedCategoryList
    : categoryApi.getMyCategoryList;
  await queryClient.prefetchInfiniteQuery(
    categoriesKey,
    async () => {
      const categoryList = await getCategoryQueryFn({});
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
  const categoryList = queryClient.getQueryData(categoriesKey);
  if (categoryList) {
    context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  }
  return { isRecommendedRequest };
});

export default Category;
