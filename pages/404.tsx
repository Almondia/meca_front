import Image from 'next/image';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { HiddenText, TextBodySubtitle } from '@/styles/common';
import { FlexColumnCenter } from '@/styles/layout';

export interface NotFoundProps {
  message?: string;
}

const NotFoundWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 60px;
  ${FlexColumnCenter};
  row-gap: 30px;
  width: 100vw;
  height: 90vh;
`;

const NotFound = ({ message }: NotFoundProps) => {
  const router = useRouter();
  return (
    <NotFoundWrapper>
      <Image src="/images/404img.png" width={260} height={238} alt="404-image" />
      <TextBodySubtitle> 404 아무일도... 없었다!!</TextBodySubtitle>
      <Button colorTheme="primary" onClick={() => router.push('/')}>
        홈으로
      </Button>
      <HiddenText>{message}</HiddenText>
    </NotFoundWrapper>
  );
};

export default NotFound;
