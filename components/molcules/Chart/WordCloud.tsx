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

const WordCloud = () => {
  const words = [
    {
      text: '준비중',
      value: 64,
    },
    {
      text: 'meca',
      value: 11,
    },
    {
      text: 'hello',
      value: 16,
    },
    {
      text: '안녕하세요',
      value: 17,
    },
    {
      text: 'discomfort',
      value: 11,
    },
    {
      text: 'lower',
      value: 22,
    },
    {
      text: 'severe',
      value: 12,
    },
    {
      text: 'free',
      value: 38,
    },
    {
      text: '바부',
      value: 5,
    },
  ];
  return (
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
};

export default WordCloud;
