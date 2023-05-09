import { ComponentMeta, ComponentStory } from '@storybook/react';

import ImageCropper, { ImageCropperProps } from '@/components/molcules/ImageCropper';

export default {
  title: 'components/molcules/ImageCropper',
  component: ImageCropper,
  parameters: {
    componentSubtitle: 'Image Crop 컴포넌트',
  },
} as ComponentMeta<typeof ImageCropper>;

const Template: ComponentStory<typeof ImageCropper> = (args: ImageCropperProps) => <ImageCropper {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
  isCropBoxResizable: true,
  minCropBoxWidth: 40,
  minCropBoxHeight: 100,
};
