import ReactWordcloud, { Options } from 'react-wordcloud';
import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

const WordCloudWrapper = styled(ReactWordcloud)<{ height: ElementSizeType }>`
  width: 100% !important;
  height: ${(props) => props.height} !important;
  background-color: var(--color-brightgray);
  border-radius: ${({ theme }) => theme.border.card};
  svg {
    width: 100% !important;
    height: 100% !important;
  }
  @media ${({ theme }) => theme.media.mobile} {
    svg {
      transform: scale(0.8);
    }
  }
`;

interface WordCloudProps {
  words: {
    text: string;
    value: number;
  }[];
  maxheight: ElementSizeType;
  isLoading: boolean;
}

const fallbackWordCloudOptions: Partial<Options> = {
  fontFamily: 'impact',
  fontSizes: [36, 62],
  enableTooltip: false,
  deterministic: true,
  rotations: 1,
  rotationAngles: [0, 0],
  transitionDuration: 1000,
  padding: 10,
};

const WordCloud = ({ words, maxheight, isLoading }: WordCloudProps) => {
  if (isLoading) {
    return (
      <WordCloudWrapper
        words={[
          { text: 'Loading...', value: 100 },
          { text: 'please wait', value: 50 },
          { text: '불러오는 중', value: 50 },
        ]}
        height={maxheight}
        options={fallbackWordCloudOptions}
      />
    );
  }
  if (words.length === 0) {
    return (
      <WordCloudWrapper
        words={[
          { text: 'NOTHING', value: 100 },
          { text: '없음', value: 50 },
          { text: 'EMPTY', value: 50 },
        ]}
        height={maxheight}
        options={fallbackWordCloudOptions}
      />
    );
  }
  return (
    <WordCloudWrapper
      words={words}
      height={maxheight}
      options={{
        fontFamily: 'impact',
        fontSizes: [16, 48],
        enableTooltip: false,
        deterministic: true,
        scale: 'sqrt',
        spiral: 'archimedean',
        rotations: 1,
        rotationAngles: [0, 0],
        transitionDuration: 1000,
        padding: 1,
      }}
    />
  );
};

export default WordCloud;
