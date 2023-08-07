import styled from 'styled-components';

export const MecaTagToggleGroupWrapper = styled.div`
  display: flex;
  column-gap: 6px;
  padding-top: 6px;
`;

export const MecaTagButton = styled.button`
  transform: scale(1.1);
  @media ${({ theme }) => theme.media.mobile} {
    transform: scale(0.9);
    margin-left: -15px;
  }
`;
