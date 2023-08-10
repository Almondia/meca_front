import styled from 'styled-components';

import { FlexSpaceBetween } from '@/styles/layout';

export const LikeButtonWrapper = styled.button<{ isActive: boolean }>`
  position: relative;
  ${FlexSpaceBetween};
  align-items: center;
  min-width: 60px;
  column-gap: 6px;
  padding: 2px 12px;
  border: 1px solid var(--color-lightgray);
  border-radius: ${({ theme }) => theme.border.card};
  background-color: ${(props) => (props.isActive ? 'var(--color-brand)' : 'transparent')};

  & > *:first-child {
    margin-top: 2px;
  }

  :active:after {
    opacity: 0.3;
    transform: scale(0.3);
    transition: 0s;
  }
  .like-count {
    color: ${(props) => (props.isActive ? '#FFF' : 'var(--color-text)')};
    font-size: 14px;
    margin-top: -1px;
  }
  transition: background-color 1s;
`;
