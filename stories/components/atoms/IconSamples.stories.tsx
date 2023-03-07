import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon, { iconTypes } from '@/components/atoms/Icon';

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

const Icons: React.ReactNode = (
  <>
    {iconTypes.map((icon) => (
      <Icon key={icon} icon={icon} />
    ))}
  </>
);

export default {
  title: 'components/atoms/IconSamples',
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
  children: Icons,
};
