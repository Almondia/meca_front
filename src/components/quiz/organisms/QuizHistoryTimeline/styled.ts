import styled, { css } from 'styled-components';

import Button from '@/components/@common/atoms/Button';
import { FlexCenter } from '@/styles/layout';

const WrapperHidedStyle = css`
  ::after {
    position: absolute;
    content: '';
    bottom: 94px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    height: 160px;
    background: linear-gradient(to bottom, var(--color-background-gradient), var(--color-background));
    z-index: 1;
  }
`;

export const QuizHistoryTimelineWrapper = styled.div<{ hided: boolean }>`
  position: relative;
  padding: 0;
  margin-top: -30px;
  @media ${({ theme }) => theme.media.mobile} {
    margin-left: -12px;
  }
  ${(props) => props.hided && WrapperHidedStyle};
`;

export const QuizHistoryTimelineMoreFetchButton = styled(Button)<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transform: translateY(-60px);
  @media ${({ theme }) => theme.media.mobile} {
    margin-left: 6px;
  }
`;

export const QuizHistoryTimelineEmpty = styled.div`
  ${FlexCenter};
  width: 100%;
  min-height: 220px;
  border-bottom: 1px solid var(--color-lightgray);
  border-top: 1px solid var(--color-lightgray);
`;
