import styled from 'styled-components';

export const IconButtonWrapper = styled.button<{ iconSize: number; hasHoverEffect: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.hasHoverEffect ? props.iconSize * 1.7 : props.iconSize)}px;
  height: ${(props) => (props.hasHoverEffect ? props.iconSize * 1.7 : props.iconSize)}px;
  margin-top: 2px;
  border-radius: 50%;
  ${(props) =>
    props.hasHoverEffect && ':hover { background-color: var(--color-lightgray); } & > *:hover { opacity: 0.6; }'};
`;
