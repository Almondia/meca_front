import styled from 'styled-components';

import { FlexColumnCenter } from '@/styles/layout';

export const LoginCardWrapper = styled.div`
  ${FlexColumnCenter};
  row-gap: 14px;
  width: 358px;
  height: 350px;
`;

export const SocialButtonContainer = styled.div`
  ${FlexColumnCenter};
  row-gap: 8px;
  margin-top: 20px;
`;

const SocialButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 42px;
  border-radius: 4px;
`;

export const KakaoButton = styled(SocialButton)`
  color: #3a2929;
  background-color: #fddc3f;
`;

export const NaverButton = styled(SocialButton)`
  color: white;
  background-color: #00c73c;
`;

export const GoogleButton = styled(SocialButton)`
  border: 1px solid var(--color-gray400);
  background-color: white;
  & > div {
    padding-top: 5px;
  }
`;
