/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropdownMenu, { DropdownMenuProps } from '@/components/molcules/DropdownMenu';

export default {
  title: 'components/molcules/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    componentSubtitle: '드롭다운 메뉴',
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args: DropdownMenuProps) => (
  <div
    style={{
      width: '100px',
      height: '100px',
    }}
  >
    <DropdownMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <DropdownMenu.Menu href="">hello</DropdownMenu.Menu>
      <DropdownMenu.Menu href="">world</DropdownMenu.Menu>
      <DropdownMenu.Menu href="">Storybook</DropdownMenu.Menu>
    </>
  ),
  right: '10px',
  top: '10px',
  name: 'name',
};
