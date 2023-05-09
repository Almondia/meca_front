import styled from 'styled-components';

import { FlexCenter, FlexColumnCenter } from '@/styles/layout';

export const ThumbnailUploaderWrapper = styled.div`
  position: relative;
  ${FlexColumnCenter};
  width: 300px;
  height: 150px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.border.card};
  background-color: var(--color-lightgray);
`;

export const ThumbnailHiddenInputBox = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

export const ThumbnailUploadButton = styled.button`
  position: relative;
  ${FlexColumnCenter};
  row-gap: 6px;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--color-gray);
  border-radius: 2px;
  color: var(--color-text);
`;

export const ThumbnailDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  min-width: 24px;
  border-radius: 0;
  border-top-right-radius: 2px;
  color: white;
  background-color: var(--color-gray800);
  :hover {
    background-color: var(--color-gray600);
  }
`;

export const ThumbnailImageContainer = styled(ThumbnailUploadButton.withComponent('div'))<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* or cover */
`;

export const ThumbnailChangeBox = styled.div`
  ${FlexCenter};
  justify-content: flex-end;
  margin-top: 4px;
  max-width: 140px;
  column-gap: 10px;
`;

export const ThumbnailChangeLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.caption};
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
