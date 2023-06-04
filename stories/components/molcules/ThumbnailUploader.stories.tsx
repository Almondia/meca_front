import { ComponentMeta, ComponentStory } from '@storybook/react';

import ThumbnailUploader, { ThumbnailUploaderProps } from '@/components/molcules/ThumbnailUploader';
import useImage from '@/hooks/useImage';

export default {
  title: 'components/molcules/ThumbnailUploader',
  component: ThumbnailUploader,
  parameters: {
    componentSubtitle: '썸네일 업로드 컴포넌트',
  },
} as ComponentMeta<typeof ThumbnailUploader>;

const Template: ComponentStory<typeof ThumbnailUploader> = (args: ThumbnailUploaderProps) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { image, onSetFileImage, onDelete, onUploadLocalImage } = useImage(args.image as string | undefined);
  return (
    <ThumbnailUploader onSetImage={onSetFileImage} image={image} onDelete={onDelete} onUpload={onUploadLocalImage} />
  );
};

export const Default = Template.bind({});

export const HasImage = Template.bind({});
HasImage.args = {
  image: 'https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png',
};
