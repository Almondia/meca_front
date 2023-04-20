import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/atoms/Button';
import { HiddenText, TextBodySubtitle } from '@/styles/common';
import { ErrorPageSection } from '@/styles/layout';

export interface NotFoundProps {
  message?: string;
}

const NotFound = ({ message }: NotFoundProps) => {
  const router = useRouter();
  return (
    <ErrorPageSection>
      <Image src="/images/404img.png" width={260} height={238} alt="404-image" />
      <TextBodySubtitle> 404 아무일도... 없었다!!</TextBodySubtitle>
      <Button colorTheme="primary" onClick={() => router.push('/')}>
        홈으로
      </Button>
      <HiddenText>{message}</HiddenText>
    </ErrorPageSection>
  );
};

export default NotFound;
