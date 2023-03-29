import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const PostWriterInfoWrapper = styled.div`
  ${FlexSpaceBetween};
  margin-top: 40px;
  margin-bottom: -10px;
`;

export const WriterInfoBox = styled.div`
  ${FlexCenter};
  column-gap: 10px;
`;

export const ModificationBox = styled.div`
  ${FlexCenter};
  column-gap: 10px;
  & > a:hover {
    text-decoration: underline;
  }
`;
