import Icon from '@/components/atoms/Icon';
import { TextCaption } from '@/styles/common';

import { GoogleButton, KakaoButton, LoginCardWrapper, NaverButton, SocialButtonContainer } from './styled';

const LoginCard = () => {
  const handleLogin = (envValue?: string) => {
    window.location.assign(envValue ?? '');
  };
  return (
    <LoginCardWrapper>
      {/* TODO: 로고 추가하기 */}
      <h4>MecaLogo</h4>
      <SocialButtonContainer>
        <KakaoButton onClick={() => handleLogin(process.env.NEXT_PUBLIC_KAKAO_LOGIN)}>
          <Icon icon="Kakao" size="20px" />
          <p>카카오로 로그인</p>
        </KakaoButton>
        <NaverButton onClick={() => handleLogin(process.env.NEXT_PUBLIC_NAVER_LOGIN)}>
          <Icon icon="Naver" size="20px" />
          <p>네이버로 로그인</p>
        </NaverButton>
        <GoogleButton onClick={() => handleLogin(process.env.NEXT_PUBLIC_GOOGLE_LOGIN)}>
          <Icon icon="Google" size="22px" />
          <p>google로 로그인</p>
        </GoogleButton>
      </SocialButtonContainer>
      <TextCaption>소셜 로그인으로 MeCa 시작하기</TextCaption>
    </LoginCardWrapper>
  );
};

export default LoginCard;
