import styled, { css } from 'styled-components';

import Button from '@/components/@common/atoms/Button';
import { FlexCenter } from '@/styles/layout';

const WrapperHidedStyle = css`
  max-height: 800px;
  overflow: hidden;
  :before {
    position: absolute;
    content: '';
    bottom: 2rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 98%;
    height: 200px;
    background: linear-gradient(to bottom, var(--color-background-gradient), var(--color-background));
    z-index: 2;
  }
`;

export const QuizHistoryTimelineWrapper = styled.div<{ hided: boolean }>`
  position: relative;
  padding: 0;
  @media ${({ theme }) => theme.media.mobile} {
    margin-left: -12px;
  }
  & > div {
    margin-top: 6px;
    ${(props) => props.hided && WrapperHidedStyle};
  }
`;

export const QuizHistoryTimelineMoreFetchButton = styled(Button)<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

export const QuizHistoryTimelineEmpty = styled.div`
  ${FlexCenter};
  width: 100%;
  min-height: 220px;
  border-bottom: 1px solid var(--color-lightgray);
  border-top: 1px solid var(--color-lightgray);
`;
