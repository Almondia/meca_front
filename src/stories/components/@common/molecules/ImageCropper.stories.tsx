/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ImageCropper from '@/components/@common/molecules/ImageCropper';
import useImage from '@/hooks/useImage';

export default {
  title: 'components/@common/molecules/ImageCropper',
  component: ImageCropper,
  parameters: {
    componentSubtitle: 'Image Crop 컴포넌트',
  },
} as ComponentMeta<typeof ImageCropper>;

const Template: ComponentStory<typeof ImageCropper> = (args) => {
  const { onSetFileImage } = useImage(args.image);
  return <ImageCropper {...args} setImage={onSetFileImage} />;
};

export const Default = Template.bind({});
Default.args = {
  image: 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
  isCropBoxRatioChangeable: true,
  minCropBoxWidth: 40,
  minCropBoxHeight: 100,
};
