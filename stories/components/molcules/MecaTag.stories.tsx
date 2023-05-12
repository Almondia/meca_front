import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaTag, { MecaTagProps } from '@/components/molcules/MecaTag';
import { MECATAG_VALUES } from '@/components/molcules/MecaTag/type';
import { MecaTagType } from '@/types/domain';

export default {
  title: 'components/molcules/MecaTag',
  component: MecaTag,
} as ComponentMeta<typeof MecaTag>;

const Template: ComponentStory<typeof MecaTag> = (args: MecaTagProps) => (
  <div style={{ padding: '30px' }}>
    <MecaTag {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  tagName: 'keyword',
};

const mecaKeys = Object.keys(MECATAG_VALUES) as MecaTagType[];
export const MecaTagList = () => {
  const [scale, setScale] = useState<string>('1');
  return (
    <>
      <div
        style={{ display: 'flex', columnGap: `${16 + 32 * (Math.min(parseFloat(scale), 2) - 1)}px`, height: '110px' }}
      >
        {mecaKeys.map((key) => (
          <MecaTag key={key} tagName={key} scale={parseFloat(scale)} />
        ))}
      </div>
      set scale from `1` to `2`:&nbsp;
      <input type="text" value={scale} onChange={(e) => setScale(e.target.value)} />
    </>
  );
};
