import ReactWordcloud from 'react-wordcloud';
import styled from 'styled-components';

import { ElementSizeType } from '@/types/common';

const WordCloudWrapper = styled(ReactWordcloud)<{ maxHeight: ElementSizeType }>`
  width: 100% !important;
  height: ${(props) => props.maxHeight} !important;
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

export interface WordCludProps {
  words: {
    text: string;
    value: number;
  }[];
  maxheight: ElementSizeType;
}

const WordCloud = ({ words, maxheight }: WordCludProps) => (
  <WordCloudWrapper
    words={words}
    maxHeight={maxheight}
    options={{
      fontFamily: 'impact',
      fontSizes: [12, 36],
      enableTooltip: false,
      deterministic: true,
      scale: 'sqrt',
      spiral: 'archimedean',
      rotations: 3,
      rotationAngles: [-90, 90],
      transitionDuration: 1000,
      padding: 1,
    }}
  />
);

export default WordCloud;
