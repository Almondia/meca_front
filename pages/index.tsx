import { GetStaticProps } from 'next';

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
import { getPlaceholderBlurImage } from '@/utils/placeholderHandler';

export default function Home() {
  const { categoryList, hasNextPage, fetchNextPage, changeSearchQuery, isEmpty } = useSharedCategory();
  return (
    <>
      <MetaHead />
      <HomeCarousel />
      <ListSection>
        <CategoryControl onChangeQuery={changeSearchQuery} isShared />
        <Devide />
        <CategoryList
          categoryList={categoryList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isEmpty={isEmpty}
        />
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
          const placeholderThumbnail = thumbnail && (await getPlaceholderBlurImage(getRemoteImageUrl(thumbnail), 20));
          if (!placeholderThumbnail) {
            return category;
          }
          const { img, blurDataURL } = placeholderThumbnail;
          return { ...category, blurThumbnail: { ...img, blurDataURL } };
        }),
      );
      return { ...categoryList, contents: categoryListContentWithBlurURL };
    },
    { getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined },
  );
  const categoryList = queryClient.getQueryData([queryKey.categories, 'shared', '']);
  return {
    revalidate: !categoryList ? 60 : 3600,
  };
});
