import { GetStaticProps } from 'next';

import { getPlaiceholder } from 'plaiceholder';

import categoryApi from '@/apis/categoryApi';
import MetaHead from '@/components/common/MetaHead';
import CategoryControl from '@/components/organisms/CategoryControl';
import CategoryList from '@/components/organisms/CategoryList';
import HomeCarousel from '@/components/organisms/HomeCarousel';
import useSharedCategory from '@/hooks/category/useSharedCategory';
import { isrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { Devide, ListSection } from '@/styles/layout';
import { getRemoteImageUrl } from '@/utils/imageHandler';

export default function Home() {
  const { categories, hasNextPage, fetchNextPage, changeSearchQuery } = useSharedCategory();
  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListSection>
        <CategoryControl onChangeQuery={changeSearchQuery} isShared />
        <Devide />
        <CategoryList categoryList={categories} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </ListSection>
    </>
  );
}

export const getStaticProps: GetStaticProps = isrAspect(async (_, queryClient) => {
  await queryClient.prefetchInfiniteQuery(
    [queryKey.categories, 'shared', ''],
    async () => {
      const categoryList = await categoryApi.getSharedCategoryList({});
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
    { getNextPageParam: (lastPage) => lastPage.hasNext },
  );
  const categoryList = queryClient.getQueryData([queryKey.categories, 'shared', '']);
  return {
    revalidate: !categoryList ? 60 : 3600,
  };
});
