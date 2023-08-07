import styled from 'styled-components';

export const MecaTagWrapper = styled.div<{ isNotOpaque: boolean }>`
  opacity: ${(props) => (props.isNotOpaque ? 0.3 : 1)};
`;
