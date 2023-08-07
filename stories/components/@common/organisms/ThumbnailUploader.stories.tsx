import { ComponentMeta, ComponentStory } from '@storybook/react';

import ThumbnailUploader from '@/components/@common/organisms/ThumbnailUploader';
import useImage from '@/hooks/useImage';

export default {
  title: 'components/@common/organisms/ThumbnailUploader',
  component: ThumbnailUploader,
  parameters: {
    componentSubtitle: '썸네일 업로드 컴포넌트',
  },
} as ComponentMeta<typeof ThumbnailUploader>;

const Template: ComponentStory<typeof ThumbnailUploader> = (args) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { image, onSetFileImage, onDelete, onUploadLocalImage } = useImage(args.image as string | undefined);
  return (
    <ThumbnailUploader onSetImage={onSetFileImage} image={image} onDelete={onDelete} onUpload={onUploadLocalImage} />
  );
};

export const Default = Template.bind({});

export const HasImage = Template.bind({});
HasImage.args = {
  image: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_1280.jpg',
};
