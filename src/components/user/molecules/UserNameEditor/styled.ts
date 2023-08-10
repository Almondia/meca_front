import styled from 'styled-components';

export const UserNameEditorWrapper = styled.div`
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
