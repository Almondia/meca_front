import styled, { css } from 'styled-components';

import { TextBodySubtitle, TextSubBody } from '@/styles/common';

export const Wrapper = styled.div`
  margin-bottom: -12px;
`;

const Ellipsis = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const TitleBox = styled(TextBodySubtitle)`
  font-size: ${({ theme }) => theme.fontSize.caption};
`;

export const ContentBox = styled(TextSubBody)<{ ellipsis?: boolean }>`
  position: relative;
  word-wrap: break-word;
  ${(props) => (props.ellipsis ?? true) && Ellipsis};
  font-size: 14px;
  max-height: ${(props) => (props.ellipsis ?? true ? '70px' : '600px')};
  transition: max-height 1s ease-in-out;
`;

export const MoreLinkBox = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 16px;
  margin: 4px 4px 0 0;
`;
