import styled from 'styled-components';

import { FlexCenter, FlexColumnCenter } from '@/styles/layout';
import { SocialType } from '@/types/domain';

type SocialColors = Record<SocialType, { color: string; backgroundColor: string }>;

const SOCIAL_COLORS: SocialColors = {
  google: {
    color: 'black',
    backgroundColor: 'white',
  },
  kakao: {
    color: '#3a2929',
    backgroundColor: '#fddc3f',
  },
  naver: {
    color: 'white',
    backgroundColor: '#00c73c',
  },
};

export const LoginCardWrapper = styled.div`
  ${FlexColumnCenter};
  row-gap: 14px;
  width: 358px;
  height: 350px;
`;

export const SocialButtonContainer = styled.div`
  ${FlexCenter};
  justify-content: flex-start;
  column-gap: 32px;
  margin-top: 16px;
`;

export const SocialButton = styled.button<{ socialType: SocialType; hasBorder?: boolean }>`
  border-radius: 50%;
  padding: 8px 8px 4px 8px;
  color: ${(props) => SOCIAL_COLORS[props.socialType].color};
  background-color: ${(props) => SOCIAL_COLORS[props.socialType].backgroundColor};
  border: ${(props) => props.hasBorder && '1px solid var(--color-lightgray)'};

  :hover,
  :focus {
    & > * {
      transform: scale(1.2);
      transition: transform 0.4s ease-out;
    }
  }
`;
