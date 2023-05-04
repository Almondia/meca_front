import ReactWordcloud from 'react-wordcloud';
import styled from 'styled-components';

const WordCloudWrapper = styled(ReactWordcloud)`
  width: 100% !important;
  height: 200px !important;
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
}

const WordCloud = ({ words }: WordCludProps) => (
  <WordCloudWrapper
    words={words}
    options={{
      fontFamily: 'impact',
      fontSizes: [16, 40],
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
