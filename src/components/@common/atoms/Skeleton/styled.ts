import styled, { keyframes } from 'styled-components';

const WaveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const SkeletonWrapper = styled.div`
  position: relative;
  /* overflow: hidden; */
  width: 100%;
  height: auto;
  .skeleton-item::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    animation: ${WaveAnimation} 1.6s linear 0.5s infinite;
    background: linear-gradient(90deg, transparent, #ddd, transparent);
    transform: translateX(-100%);
  }
`;

export const SkeletonContentWrapper = styled.div`
  overflow: hidden;
  position: relative;
  background: var(--color-lightgray);
  color: var(--color-lightgray);
`;
