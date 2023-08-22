import styled, { css } from 'styled-components';

import { TextBodyTitle } from '@/styles/common';
import { FlexColumn } from '@/styles/layout';

export const CardWrapper = styled.article`
  position: relative;
  width: 100%;
  border: ${({ theme }) => theme.border.card};
  box-shadow: var(--shadow-normal);
  background-color: var(--color-element-background);
  @media ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

const CardThumbnailDefaultStyle = css`
  position: relative;
  overflow: hidden;
  margin-bottom: -8px;
  max-width: 100%;
`;

export const CardThumbnailWrapper = styled.div<{ ratioWidth: number; ratioHeight: number }>`
  ${CardThumbnailDefaultStyle};
  aspect-ratio: ${(props) => `calc(${props.ratioWidth} / ${props.ratioHeight})`};
  & > img {
    object-fit: cover;
    border-top-right-radius: ${({ theme }) => theme.border.card};
    border-top-left-radius: ${({ theme }) => theme.border.card};
    :hover {
      transform: scale(1.05);
    }
    transition: transform 0.75s ease-in-out;
  }
`;

export const CardTitleWrapper = styled(TextBodyTitle.withComponent('h3'))`
  display: -webkit-box;
  width: 90%;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  & > a {
    display: inline;
    color: var(--color-text);
    :hover {
      cursor: pointer;
      color: var(--color-brand);
    }
  }
  & > p {
    display: inline;
    color: var(--color-text);
  }
`;

export const CardBodyWrapper = styled.div`
  ${FlexColumn};
  row-gap: 6px;
  position: relative;
  padding: 24px 16px 16px 24px;
  @media ${({ theme }) => theme.media.mobile} {
    row-gap: 4px;
  }
`;

export const CardThumbnailSkeletonWrapper = styled.div<{ ratio: number }>`
  ${CardThumbnailDefaultStyle};
  aspect-ratio: ${(props) => props.ratio};
  .skeleton-item {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`;

export const CardSkeletonWrapper = styled(CardWrapper).attrs({ as: 'div' })<{ idx: number }>`
  @media ${({ theme }) => theme.media.tablet} {
    display: ${(props) => (props.idx > 5 ? 'none' : 'block')};
  }
  @media ${({ theme }) => theme.media.mobile} {
    display: ${(props) => (props.idx > 1 ? 'none' : 'block')};
  }
  .skeleton-item {
    border-radius: ${({ theme }) => theme.border.card};
  }
`;

export const CardContentSkeletonWrapper = styled.div<{ height: string }>`
  ${FlexColumn};
  justify-content: center;
  row-gap: 4px;
  height: ${(props) => props.height};
  overflow: hidden;
  & > div {
    display: flex;
    height: 14px;
    column-gap: 8px;
  }
`;
