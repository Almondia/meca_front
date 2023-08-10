/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar from '@/components/@common/atoms/Avatar';
import Icon from '@/components/@common/atoms/Icon';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';

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
  <div
    style={{
      width: '100px',
      height: '100px',
      position: 'relative',
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
  right: '-40px',
  top: '10px',
  name: 'name',
};

export const WithWrapper = Template.bind({});
WithWrapper.args = {
  children: (
    <>
      <DropdownMenu.Menu href="">hello</DropdownMenu.Menu>
      <DropdownMenu.Menu href="">world</DropdownMenu.Menu>
      <DropdownMenu.Menu href="">Storybook</DropdownMenu.Menu>
    </>
  ),
  right: '-40px',
  top: '10px',
  name: 'name',
  wrapperComponent: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '2px' }}>
      <Avatar imgSize={36} imgName="avatar" />
      <Icon icon="CompactDown" size="16px" />
    </div>
  ),
  scale: 0.7,
};
