import Image from 'next/image';

import { useEffect } from 'react';

import Button from '@/components/atoms/Button';
import LoginDialog from '@/components/molcules/LoginDialog';
import useLogout from '@/hooks/useLogout';
import useModal from '@/hooks/useModal';
import { HiddenText, TextBodySubtitle } from '@/styles/common';
import { ErrorPageSection } from '@/styles/layout';

export interface UnauthorizedProps {
  message?: string;
}

const Unauthorized = ({ message }: UnauthorizedProps) => {
  const { visible, open, close } = useModal();
  const { logout } = useLogout();
  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ErrorPageSection>
      <Image src="/images/401img.png" width={343} height={238} alt="401-image" />
      <TextBodySubtitle> 로그인이... 필요합니다!!</TextBodySubtitle>
      <Button colorTheme="primary" onClick={open}>
        로그인
      </Button>
      {visible && <LoginDialog visible={visible} onClose={close} />}
      <HiddenText>{message ?? 'unauthorized'}</HiddenText>
    </ErrorPageSection>
  );
};

export default Unauthorized;
