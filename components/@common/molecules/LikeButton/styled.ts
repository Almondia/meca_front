import styled from 'styled-components';

export const LikeButtonWrapper = styled.button<{ isActive: boolean }>`
  position: relative;
  width: 46px;
  height: 46px;
  border: 1px solid var(--color-lightgray);
  border-radius: 100%;
  background-color: ${(props) => (props.isActive ? 'var(--color-brand)' : 'transparent')};
  & > div > * {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  :after {
    content: '❤︎';
    position: absolute;
    font-size: 30px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    margin: auto;
    border-radius: 100%;
    background: ${(props) => (props.isActive ? 'var(--color-gray)' : 'var(--color-brand)')};
    opacity: 0;
    transform: scale(1);
    transition: all 1s;
  }
  :active:after {
    opacity: 0.3;
    transform: scale(0.3);
    transition: 0s;
  }
  transition: background-color 1s;
`;
