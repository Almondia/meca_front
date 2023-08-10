import styled from 'styled-components';

import { FlexCenter } from '@/styles/layout';

export const ToggleSwitchWrapper = styled.div`
  position: relative;
  ${FlexCenter};
  justify-content: flex-start;
  width: 48px;
  height: 26px;
  padding: 2px 4px;
  border-radius: 30px;
  cursor: pointer;
`;

export const ToggleSwitchBackground = styled.button<{ isOn: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isOn ? 'var(--color-brand)' : 'var(--color-gray400)')};
  & > .toggle-switch-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: white;
    transform: ${(props) => (props.isOn ? 'translateX(22px)' : 'translateX(0)')};
    transition: transform 0.4s;
  }
  transition: background-color 0.5s;
`;
