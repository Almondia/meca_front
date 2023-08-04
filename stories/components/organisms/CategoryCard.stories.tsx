/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useSetRecoilState } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import CategoryCard, { CategoryCardProps } from '@/components/organisms/CategoryCard';
import useMyCategory from '@/hooks/category/useMyCategory';
import {
  mockedDeleteCategoryApi,
  mockedGetAuthUserCategoryListApi,
  mockedPostRevalidateApi,
  mockedPutCategoryApi,
} from '@/mock/api';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/organisms/CategoryCard',
  component: CategoryCard,
  parameters: {
    componentSubtitle: '카테고리 카드',
  },
} as ComponentMeta<typeof CategoryCard>;

const Template: ComponentStory<typeof CategoryCard> = (args: CategoryCardProps) => (
  <div style={{ maxWidth: '380px' }}>
    <CategoryCard {...args}>{args.children}</CategoryCard>
  </div>
);

export const Private = () => {
  const setHasAuth = useSetRecoilState(hasAuthState);
  useEffect(() => {
    setHasAuth(true);
    return () => {
      setHasAuth(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  implementWorker([
    restHandler(mockedPostRevalidateApi),
    restHandler(mockedPutCategoryApi),
    restHandler(mockedDeleteCategoryApi, { status: 400, message: '삭제!' }),
    restOverridedResponseHandler(mockedGetAuthUserCategoryListApi, {
      contents: [
        {
          categoryId: '01889f08-bced-fd13-4479-ffd91cd5a3be',
          memberId: '01889f08-bced-fd13-4479-ffd91cd5a3bf',
          thumbnail: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
          title: 'The standard Lorem Ipsum passage',
          createdAt: '2023-06-09T16:22:10.0299318',
          modifiedAt: '2023-06-09T16:22:10.0299318',
          scoreAvg: 0.66,
          solveCount: 5,
          totalCount: 10,
          likeCount: 14,
          shared: false,
          deleted: false,
        },
      ],
      hasNext: null,
      pageSize: 1,
      sortOrder: 'DESC',
    }),
  ]);
  const { categoryList } = useMyCategory(true);
  if (!categoryList.contents[0]) {
    return <div>no data!</div>;
  }
  const category = categoryList.contents[0];
  return (
    <Template {...category}>
      <CategoryCard.Private {...category} />
    </Template>
  );
};

export const Shared = Template.bind({});
Shared.args = {
  title: 'The standard Lorem Ipsum passage',
  thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/24cb26a7-e284-45c9-a9d0-d9dfb5e6baa6',
  children: (
    <CategoryCard.Shared
      memberId="memberId"
      name="bounge choi"
      profile="https://github.com/Almondia/meca_front/assets/76927397/d758d9f8-d4a0-4047-b00b-c96b4d814c66"
      likeCount={5}
    />
  ),
};
