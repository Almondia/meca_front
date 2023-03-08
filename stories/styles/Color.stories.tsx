import { ComponentMeta, ComponentStory } from '@storybook/react';

import { COLOR } from '@/styles/constants';

const ColorWrapper = ({ children }: { children: React.ReactNode }) => (
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

type ColorType = keyof typeof COLOR;
const colors = Object.keys(COLOR) as ColorType[];
const Colors: React.ReactNode = (
  <>
    {colors.map((color) => (
      <div key={color} style={{ width: '80px' }}>
        <p style={{ backgroundColor: COLOR[color], width: '60px', height: '60px', borderRadius: '6px' }} />
        <p>{color}</p>
        <p>{COLOR[color]}</p>
      </div>
    ))}
  </>
);

export default {
  title: 'styles/color',
  component: ColorWrapper,
  parameters: {
    controls: {
      exclude: ['children'],
    },
    componentSubtitle: '색상 모음',
  },
} as ComponentMeta<typeof ColorWrapper>;

const Template: ComponentStory<typeof ColorWrapper> = ({ children }: { children: React.ReactNode }) => (
  <ColorWrapper>{children}</ColorWrapper>
);

export const Default = Template.bind({});
Default.args = {
  children: Colors,
};
