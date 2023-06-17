/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CardMenu, { CardMenuProps } from '@/components/molcules/CardMenu';

export default {
  title: 'components/molcules/CardMenu',
  component: CardMenu,
  parameters: {
    componentSubtitle: '카드 메뉴 컴포넌트',
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof CardMenu>;

const Template: ComponentStory<typeof CardMenu> = (args: CardMenuProps) => (
  <div
    style={{
      width: '100px',
      height: '100px',
    }}
  >
    <CardMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <CardMenu.Dropdown>
      <CardMenu.Dropdown.Content href="">hello</CardMenu.Dropdown.Content>
      <CardMenu.Dropdown.Content href="">world</CardMenu.Dropdown.Content>
      <CardMenu.Dropdown.Content href="">StoryBook</CardMenu.Dropdown.Content>
    </CardMenu.Dropdown>
  ),
  right: '10px',
  top: '10px',
  name: 'name',
};
