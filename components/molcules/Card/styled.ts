import styled from 'styled-components';

import { TextBodyTitle } from '@/styles/common';
import { FlexColumn } from '@/styles/layout';

export const CardWrapper = styled.article`
  position: relative;
  width: 100%;
  border: ${({ theme }) => theme.border.card};
  box-shadow: var(--shadow-normal);
  @media ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

export const CardThumbnailWrapper1 = styled.div`
  width: 100%;
  content: '';
  background-color: red;
`;

export const CardThumbnailWrapper = styled.div<{ hasStaticHeight?: boolean }>`
  position: relative;
  width: 100%;
  margin-bottom: -8px;
  overflow: hidden;
  padding-top: ${(props) => props.hasStaticHeight && '50%'};
  & > img {
    object-fit: cover;
    ${(props) => !props.hasStaticHeight && 'min-height: 80px'};
    ${(props) => !props.hasStaticHeight && 'max-height: 340px'};
    ${(props) => !props.hasStaticHeight && 'position: relative !important'};
    border-top-right-radius: ${({ theme }) => theme.border.card};
    border-top-left-radius: ${({ theme }) => theme.border.card};
    :hover {
      transform: scale(1.05);
    }
    @media ${({ theme }) => theme.media.mobile} {
      ${(props) => !props.hasStaticHeight && 'min-height: 60px'};
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
