/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DotMenuOpener, { DotMenuOpenerProps } from '@/components/molcules/DotMenuOpener';
import DropdownMenu from '@/components/atoms/DropdownMenu';

export default {
  title: 'components/molcules/DotMenuOpener',
  component: DotMenuOpener,
  parameters: {
    componentSubtitle: '메뉴 오픈 컴포넌트',
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof DotMenuOpener>;

const Template: ComponentStory<typeof DotMenuOpener> = (args: DotMenuOpenerProps) => (
  <div
    style={{
      width: '100px',
      height: '100px',
    }}
  >
    <DotMenuOpener {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <DropdownMenu>
      <DropdownMenu.Contents href="">hello</DropdownMenu.Contents>
    </DropdownMenu>
  ),
};

export const Empty = Template.bind({});
Empty.args = {
  children: 'hello',
  top: '10px',
  right: '100px',
};
