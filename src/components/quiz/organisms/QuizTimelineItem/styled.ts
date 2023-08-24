import styled, { css } from 'styled-components';

import { FlexCenter, FlexColumn } from '@/styles/layout';

const LeftGrid = css`
  grid-template-areas: 'card vertical-box subinfo';
`;
const RightGrid = css`
  grid-template-areas: 'subinfo vertical-box card';
`;

export interface DefaultStyleProps {
  left?: boolean;
  unindented?: boolean;
}

export const Wrapper = styled.div<DefaultStyleProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 30px 1fr;
  ${(props) => (props.left ? LeftGrid : RightGrid)};
  column-gap: 8px;
  max-width: 864px;
  margin-bottom: 1.25rem;
  ${(props) => props.unindented && 'margin-top: -70px;'};
  @media ${({ theme }) => theme.media.mobile} {
    margin-top: 0px;
    grid-template-columns: 30px 1fr;
    grid-template-areas:
      'vertical-box card'
      'vertical-box subinfo';
    column-gap: 4px;
  }
  .skeleton-item {
    border-radius: ${({ theme }) => theme.border.card};
  }
`;

export const TimelineCard = styled.div<{ left?: boolean }>`
  position: relative;
  grid-area: card;
  ${FlexCenter};
  min-height: 100px;
  ${(props) => !props.left && 'padding-left: 8px;'};
  @media ${({ theme }) => theme.media.mobile} {
    flex-direction: row-reverse;
    padding-left: 0px;
    article > div {
      padding: 12px;
    }
  }
  z-index: 1;
`;

export const TimelineCardBubbleArea = styled.div`
  width: 10px;
`;

const BubbleRight = css`
  flex-direction: row;
  left: auto;
  right: 0;
  margin-right: 2px;
  margin-right: 2px;
  margin-left: 0px;
  box-shadow: -2px 2px 3px var(--color-card-shadow);
`;

const BubbleLeft = css`
  flex-direction: row-reverse;
  right: auto;
  left: 0;
  margin-right: 0px;
  margin-left: 2px;
  box-shadow: 2px -2px 3px var(--color-card-shadow);
`;

export const TimelineCardBubble = styled.div<{ left?: boolean }>`
  position: absolute;
  background-color: var(--color-element-background);
  top: 50%;
  bottom: 0;
  width: 14px;
  height: 14px;
  border: 1px solid var(--color-element-background);
  transform: translateY(-50%) rotate(225deg);
  z-index: 1;
  ${(props) => (props.left ? BubbleRight : BubbleLeft)};
  @media ${({ theme }) => theme.media.mobile} {
    ${BubbleLeft};
  }
`;

export const VerticallineBox = styled.div`
  position: relative;
  grid-area: vertical-box;
  ${FlexCenter};
  width: 30px;
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    width: 3px;
    height: calc(100% + 1.25rem);
    background: var(--color-brand);
    z-index: 0;
  }
`;

export const TimelineSubInfoBox = styled.div<{ left?: boolean }>`
  grid-area: subinfo;
  ${FlexColumn};
  justify-content: center;
  padding: 6px;
  row-gap: 6px;
  align-items: ${(props) => (props.left ? 'flex-start' : 'flex-end')};
  @media ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 12px;
    padding: 6px 12px;
  }
  z-index: 0;
`;

export const VerticalLinePoint = styled.div<{ color: string }>`
  position: relative;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  background-color: var(--color-brand);
  z-index: 1;
  @media ${({ theme }) => theme.media.mobile} {
    margin-top: -30px;
  }
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    height: 15px;
    width: 15px;
    background-color: ${(props) => props.color};
    z-index: -1;
    transform: translateY(-50%) translateX(-50%);
  }
`;

export const TagContainer = styled.div`
  width: 50%;
  margin-top: -14px;
  margin-bottom: -4px;
`;

export const SkeletonContentWrapper = styled.div`
  ${FlexColumn};
  row-gap: 1rem;
  & > div {
    ${FlexColumn};
    row-gap: 4px;
  }
`;
