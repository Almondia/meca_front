import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button, { ButtonProps } from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

export default {
  title: 'components/atoms/Button',
  component: Button,
  parameters: {
    componentSubtitle: '버튼',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: 'Button',
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

export const WithIconButton = Template.bind({});
WithIconButton.args = {
  children: (
    <div>
      hello <Icon icon="Dice" size="16px" />
    </div>
  ),
  colorTheme: 'error',
};