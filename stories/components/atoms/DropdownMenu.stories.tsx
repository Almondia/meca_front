/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropdownMenu from '@/components/atoms/DropdownMenu';

export default {
  title: 'components/atoms/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    componentSubtitle: '드롭다운',
  },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = () => (
  <div style={{ width: '500px', height: '30px', position: 'relative', backgroundColor: 'yellow' }}>
    relative div
    <DropdownMenu>
      <DropdownMenu.Contents href="" onClick={() => alert('MENU1')}>
        메뉴1
      </DropdownMenu.Contents>
      <DropdownMenu.Contents href="" onClick={() => alert('MENU2')}>
        메뉴2
      </DropdownMenu.Contents>
      <DropdownMenu.Contents href="" onClick={() => alert('MENU3')}>
        Menu3
      </DropdownMenu.Contents>
    </DropdownMenu>
  </div>
);

export const Default = Template.bind({});
