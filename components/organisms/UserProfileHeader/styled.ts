/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FlexCenter, FlexColumn, FlexColumnCenter } from '@/styles/layout';

export const UserProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  column-gap: 60px;
  @media ${({ theme }) => theme.media.mobile} {
    ${FlexColumn};
    align-items: flex-start;
    row-gap: 16px;
  }
`;

export const UserProfileAvatarContainer = styled.div`
  ${FlexColumnCenter};
  row-gap: 12px;
  & > div:nth-child(2) {
    ${FlexCenter};
    column-gap: 12px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

export const UserProfileInfoContainer = styled.div`
  margin-top: -30px;
  @media ${({ theme }) => theme.media.mobile} {
    margin-top: 0;
  }
`;

export const UserProfileName = styled.h4`
  padding-top: 14px;
  margin-bottom: 8px;
  @media ${({ theme }) => theme.media.mobile} {
    font-size: 1.5rem;
  }
`;

export const UserProfileNameChangeBox = styled.div`
  max-width: 80%;
  margin-bottom: -8px;
  @media ${({ theme }) => theme.media.mobile} {
    max-width: 100%;
  }
`;
