/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const MecaTagWrapper = styled.div<{ isNotOpaque: boolean }>`
  opacity: ${(props) => (props.isNotOpaque ? 0.5 : 1)};
`;
