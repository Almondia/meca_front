import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/@common/atoms/Button';
import MetaHead from '@/components/@util/MetaHead';
import { HiddenText, TextBodySubtitle, TextCaption } from '@/styles/common';
import { ErrorPageSection } from '@/styles/layout';

export interface NotFoundProps {
  message?: string;
  isMessageVisible?: boolean;
}

const NotFound = ({ message, isMessageVisible = false }: NotFoundProps) => {
  const router = useRouter();
  return (
    <>
      <MetaHead />
      <ErrorPageSection>
        <Image src="/images/404img.png" width={260} height={238} alt="404-image" />
        <h4>404 Not Found!</h4>
        <TextBodySubtitle>아무일도... 없었다!!</TextBodySubtitle>
        {isMessageVisible ? <TextCaption>{message}</TextCaption> : <HiddenText>{message}</HiddenText>}
        <Button colorTheme="primary" onClick={() => router.push('/')}>
          홈으로
        </Button>
      </ErrorPageSection>
    </>
  );
};

export default NotFound;
