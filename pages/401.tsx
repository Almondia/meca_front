import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useEffect } from 'react';

import Button from '@/components/atoms/Button';
import MetaHead from '@/components/common/MetaHead';
import useModal from '@/hooks/useModal';
import { HiddenText, TextBodySubtitle } from '@/styles/common';
import { ErrorPageSection } from '@/styles/layout';

const LoginDialog = dynamic(() => import('@/components/organisms/LoginDialog'));

export interface UnauthorizedProps {
  message?: string;
}

const Unauthorized = ({ message }: UnauthorizedProps) => {
  const { visible, open, close } = useModal();

  useEffect(() => {
    (async () => {
      const { default: logout } = await import('@/hooks/useLogout');
      logout();
    })();
  }, []);

  return (
    <>
      <MetaHead />
      <ErrorPageSection>
        <Image src="/images/401img.png" width={343} height={238} alt="401-image" />
        <TextBodySubtitle> 로그인이... 필요합니다!!</TextBodySubtitle>
        <Button colorTheme="primary" onClick={open}>
          로그인
        </Button>
        {visible && <LoginDialog visible={visible} onClose={close} />}
        <HiddenText>{message ?? 'unauthorized'}</HiddenText>
      </ErrorPageSection>
    </>
  );
};

export default Unauthorized;
