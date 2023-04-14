import Slider from 'react-slick';
import styled from 'styled-components';

import { FlexCenter, FlexColumn, FlexSpaceBetween } from '@/styles/layout';

export const HomeCarouselWrapper = styled.section`
  width: 100%;
  margin-bottom: -30px;
`;

export const HomeCarouselSlider = styled(Slider)`
  .slick-dots {
    transform: translateY(-30px);
  }
`;

export const HomeCarouselContentBackground = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
`;

export const HomeCarouselContent = styled.div`
  position: relative;
  ${FlexSpaceBetween};
  align-items: center;
  margin: 0 auto;
  padding: 0 140px;
  max-width: 1280px;
  height: 232px;
  overflow: hidden;
  & > *:first-child {
    position: relative;
    z-index: 2;
    ${FlexColumn};
    justify-content: flex-start;
    row-gap: 20px;
    width: 100%;
    color: white;
  }
  & > *:nth-child(2) {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 50vw;
    ${FlexCenter};
    width: 735px;
    height: 232px;
  }
  @media ${({ theme }) => theme.media.tablet} {
    padding: 0 60px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    padding: 0 30px;
    & > *:first-child {
      h4 {
        font-size: 1.5rem;
      }
    }
    & > *:nth-child(2) {
      top: 50px;
      left: 40vw;
      transform: scale(0.8);
    }
  }
`;
