import Slider from 'react-slick';
import styled from 'styled-components';

import { FlexCenter, FlexColumn, FlexSpaceBetween } from '@/styles/layout';

export const HomeCarouselWrapper = styled.section`
  width: 100%;
`;

export const HomeCarouselSlider = styled(Slider)`
  /* Arrows */
  .slick-prev,
  .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }
  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-prev:before,
  .slick-next:before {
    font-family: 'slick';
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-prev {
    left: -25px;
  }
  .slick-next {
    right: -25px;
  }
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }
  .slick-dots {
    position: absolute;
    bottom: -25px;
    transform: translateY(-30px);
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .slick-dots li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    padding: 0;

    cursor: pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }
  .slick-dots li button:hover,
  .slick-dots li button:focus {
    outline: none;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before {
    opacity: 1;
  }
  .slick-dots li button:before {
    font-family: 'slick';
    font-size: 6px;
    line-height: 20px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: black;
    content: '';
    text-align: center;
    opacity: 0.25;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
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
