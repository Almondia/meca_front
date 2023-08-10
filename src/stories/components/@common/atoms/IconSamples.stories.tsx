import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon, { IconType } from '@/components/@common/atoms/Icon';
import Icons from '@/components/@common/atoms/Icon/Icons';

const icons = Object.keys(Icons) as IconType[];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      rowGap: '20px',
      columnGap: '20px',
      padding: '20px',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }}
  >
    {children}
  </div>
);

const AllIcons: React.ReactNode = (
  <>
    {icons.map((icon) => (
      <Icon key={icon} icon={icon} />
    ))}
  </>
);

export default {
  title: 'components/@common/atoms/IconSamples',
  component: IconWrapper,
  parameters: {
    componentSubtitle: '사용 아이콘 모음',
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof IconWrapper>;

const Template: ComponentStory<typeof IconWrapper> = ({ children }: { children: React.ReactNode }) => (
  <IconWrapper>{children}</IconWrapper>
);

export const Default = Template.bind({});
Default.args = {
  children: AllIcons,
};
