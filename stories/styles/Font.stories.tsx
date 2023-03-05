import { TextBody, TextBodySubtitle, TextBodyTitle, TextSubBody, TextCaption, TextOverline } from '@/styles/common';
import { FONT_WEIGHT } from '@/styles/constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const FontWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '20px',
      width: '600px',
    }}
  >
    {children}
  </div>
);

const FontSize: React.ReactNode = (
  <>
    <h2>h2 - title 타이틀</h2>
    <h4>h4 - title 타이틀</h4>
    <h5>h5 - title 타이틀</h5>
    <TextBodyTitle>16PX body title - 본문 타이틀1</TextBodyTitle>
    <TextBodySubtitle>14PX body subtitle - 본문 타이틀2</TextBodySubtitle>
    <TextBody>
      16PX body contents - 본문 1 - public static void 김갑환의 봉황각이 성공해서 현재 시간은 2023-03-05 20:13이다.
    </TextBody>
    <TextSubBody>
      14PX body contents - 본문 2 - public static void 김갑환의 봉황각이 성공해서 현재 시간은 2023-03-05 20:13이다.
    </TextSubBody>
    <TextCaption>
      12PX caption contents - 캡션 - public static void 김갑환의 봉황각이 성공해서 현재 시간은 2023-03-05 20:13이다.
    </TextCaption>
    <TextOverline>
      10PX overline contents - 캡션 - public static void 김갑환의 봉황각이 성공해서 현재 시간은 2023-03-05 20:13이다.
    </TextOverline>
  </>
);

type FontWeightType = keyof typeof FONT_WEIGHT;
const fontWeights = Object.keys(FONT_WEIGHT) as FontWeightType[];
const FontWeight: React.ReactNode = (
  <>
    {fontWeights.map((weight) => (
      <p style={{ fontWeight: FONT_WEIGHT[weight], fontSize: '20px' }}>hello - {weight}</p>
    ))}
  </>
);

export default {
  title: 'styles/font',
  component: FontWrapper,
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof FontWrapper>;

const Template: ComponentStory<typeof FontWrapper> = ({ children }: { children: React.ReactNode }) => (
  <FontWrapper>{children}</FontWrapper>
);

export const FontSizes = Template.bind({});
FontSizes.args = {
  children: FontSize,
};

export const FontWeights = Template.bind({});
FontWeights.args = {
  children: FontWeight,
};
