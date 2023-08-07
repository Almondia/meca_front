import { useRouter } from 'next/router';

import Icon from '@/components/@common/atoms/Icon';
import Logo from '@/components/@common/atoms/Logo';
import Modal from '@/components/@common/molecules/Modal';
import { HiddenText, TextBodyTitle, TextCaption } from '@/styles/common';
import { DefaultModalOptions } from '@/types/common';

import { SocialButton, SocialButtonContainer } from './styled';

const LoginDialog = ({ visible, onClose }: DefaultModalOptions) => {
  const router = useRouter();
  const handleLogin = (envValue?: string) => {
    router.push(envValue ?? '/');
  };
  return (
    <Modal visible={visible} onClose={onClose} hasCloseIcon isClickAwayable>
      <Modal.Title>
        <Logo size="large" />
      </Modal.Title>
      <Modal.Body>
        <TextBodyTitle>로그인하기</TextBodyTitle>
        <SocialButtonContainer>
          <SocialButton socialType="kakao" onClick={() => handleLogin(process.env.NEXT_PUBLIC_KAKAO_LOGIN)}>
            <Icon icon="Kakao" size="1.6rem" />
            <HiddenText>카카오로 로그인하기</HiddenText>
          </SocialButton>
          <SocialButton socialType="naver" onClick={() => handleLogin(process.env.NEXT_PUBLIC_NAVER_LOGIN)}>
            <Icon icon="Naver" size="1.6rem" />
            <HiddenText>네이버로 로그인하기</HiddenText>
          </SocialButton>
          <SocialButton socialType="google" hasBorder onClick={() => handleLogin(process.env.NEXT_PUBLIC_GOOGLE_LOGIN)}>
            <Icon icon="Google" size="1.6rem" />
            <HiddenText>구글로 로그인하기</HiddenText>
          </SocialButton>
        </SocialButtonContainer>
        <br />
        <TextCaption>
          소셜 계정으로 <strong>Meca</strong>를 시작해보세요!
        </TextCaption>
      </Modal.Body>
    </Modal>
  );
};

export default LoginDialog;
