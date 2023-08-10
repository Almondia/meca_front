import dynamic from 'next/dynamic';
import Image from 'next/image';

import Button from '@/components/@common/atoms/Button';
import MetaHead from '@/components/@util/MetaHead';
import useModal from '@/hooks/useModal';
import { HiddenText, TextBodySubtitle } from '@/styles/common';
import { ErrorPageLayout } from '@/styles/layout';

const LoginDialog = dynamic(() => import('@/components/@common/organisms/LoginDialog'), { ssr: false });

interface UnauthorizedProps {
  message?: string;
}

const Unauthorized = ({ message }: UnauthorizedProps) => {
  const { visible, open, close } = useModal();
  return (
    <>
      <MetaHead />
      <ErrorPageLayout>
        <Image src="/images/401img.png" width={343} height={238} alt="401-image" />
        <TextBodySubtitle> 로그인이... 필요합니다!!</TextBodySubtitle>
        <Button colorTheme="primary" onClick={open}>
          로그인
        </Button>
        {visible && <LoginDialog visible={visible} onClose={close} />}
        <HiddenText>{message ?? 'unauthorized'}</HiddenText>
      </ErrorPageLayout>
    </>
  );
};

export default Unauthorized;
