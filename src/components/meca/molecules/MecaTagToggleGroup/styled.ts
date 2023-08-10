import styled from 'styled-components';

export const MecaTagToggleGroupWrapper = styled.div`
  display: flex;
  column-gap: 6px;
  padding-top: 6px;
`;

export const MecaTagButton = styled.button<{ selected: boolean }>`
  transform: scale(1.1);
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  @media ${({ theme }) => theme.media.mobile} {
    transform: scale(0.9);
    margin-left: -15px;
  }
`;
