import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '@/components/@common/atoms/Button';

export default {
  title: 'components/@common/atoms/Button',
  component: Button,
  parameters: {
    componentSubtitle: '버튼',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Button',
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  children: 'Button',
  size: 'small',
};

export const CustomWidthButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
    <Button colorTheme="primary" width="50%">
      width: 50%
    </Button>
    <Button colorTheme="warning" width="20rem">
      width: 4rem
    </Button>
    <Button colorTheme="error" width="200px">
      width: 200px
    </Button>
    <Button colorTheme="success">width: default</Button>
  </div>
);
