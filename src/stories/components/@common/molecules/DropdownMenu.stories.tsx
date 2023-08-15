/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import IconButton from '@/components/@common/molecules/IconButton';

export default {
  title: 'components/@common/molecules/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    componentSubtitle: '드롭다운 메뉴',
    controls: {
      exclude: ['children', 'wrapperComponent'],
    },
  },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
  <div style={{ width: '21px' }}>
    <DropdownMenu {...args} />
  </div>
);

export const WithDotButton = Template.bind({});
WithDotButton.args = {
  children: (
    <>
      <DropdownMenu.Menu onClick={() => alert('hello')}>Hello</DropdownMenu.Menu>
      <DropdownMenu.Menu>World</DropdownMenu.Menu>
      <DropdownMenu.Menu href="/hello">{"Don't Write Long"}</DropdownMenu.Menu>
    </>
  ),
  wrapperComponent: ({ onClick }) => (
    <IconButton icon="VerticalDot" iconSize={14} color="var(--color-text)" onClick={onClick} name="Sample Dot Button" />
  ),
  scale: 0.7,
  menuDirection: 'left',
};
