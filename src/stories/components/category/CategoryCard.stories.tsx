/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useSetRecoilState } from 'recoil';

import type { CategoryListPaginationResponse } from '@/types/domain/category';

import { hasAuthState } from '@/atoms/common';
import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import CategoryCard from '@/components/category/organisms/CategoryCard';
import useCategoryList from '@/hooks/category/useCategoryList';
import { mockedDeleteCategoryApi, mockedGetAuthUserCategoryListApi, mockedPutCategoryApi } from '@/mock/api';
import { MOCK_CATEGORY_CONTENT, MOCK_CATEGORY_STATISTICS, MOCK_RESPONSE_MEMBER } from '@/mock/data';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/category/CategoryCard',
  component: CategoryCard,
  parameters: {
    componentSubtitle: '카테고리 카드',
    controls: {
      exclude: ['isMine'],
    },
  },
} as ComponentMeta<typeof CategoryCard>;

const Template: ComponentStory<typeof CategoryCard> = (args) => (
  <div style={{ maxWidth: '380px' }}>
    <CategoryCard {...args} />
  </div>
);

const categoryPagenationListResponse: CategoryListPaginationResponse = {
  contents: [
    {
      category: {
        categoryId: '01889f08-bced-fd13-4479-ffd91cd5a3be',
        memberId: '01889f08-bced-fd13-4479-ffd91cd5a3bf',
        thumbnail: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
        title: 'The standard Lorem Ipsum passage',
        createdAt: '2023-06-09T16:22:10.0299318',
        shared: false,
      },
      member: MOCK_RESPONSE_MEMBER,
      statistics: MOCK_CATEGORY_STATISTICS,
      likeCount: 14,
    },
  ],
  hasNext: null,
  pageSize: 1,
  sortOrder: 'DESC',
};

export const Private = () => {
  const setHasAuth = useSetRecoilState(hasAuthState);
  implementWorker([
    restHandler(mockedPutCategoryApi),
    restHandler(mockedDeleteCategoryApi, { status: 400, message: '삭제!' }),
    restOverridedResponseHandler(mockedGetAuthUserCategoryListApi, categoryPagenationListResponse),
  ]);
  useEffect(() => {
    setHasAuth(true);
    return () => {
      setHasAuth(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { categoryList } = useCategoryList('me', false);
  if (!categoryList.contents[0]) {
    return <LoadSpinner width="380px" height="380px" />;
  }
  const category = categoryList.contents[0];
  return <Template {...category} isMine />;
};

export const Shared = Template.bind({});
Shared.args = { ...MOCK_CATEGORY_CONTENT, isMine: false };
