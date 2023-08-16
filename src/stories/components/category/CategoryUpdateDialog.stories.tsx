import { useEffect, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DefaultModalOptions } from '@/types/common';

import CategoryUpdateDialog from '@/components/category/organisms/CategoryUpdateDialog';
import { mockedPutCategoryApi } from '@/mock/api';
import { MOCK_CATEGORY_ID } from '@/mock/data';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/category/CategoryUpdateDialog',
  component: CategoryUpdateDialog,
} as ComponentMeta<typeof CategoryUpdateDialog>;

const Template: ComponentStory<typeof CategoryUpdateDialog> = ({ visible }: DefaultModalOptions) => {
  implementWorker([restHandler(mockedPutCategoryApi, { status: 400, message: '업데이트 성공' })]);
  const [isVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return (
    <CategoryUpdateDialog
      categoryTitle="Title"
      thumbnail=""
      categoryId={MOCK_CATEGORY_ID}
      visible={isVisible}
      onClose={() => setVisible(false)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
