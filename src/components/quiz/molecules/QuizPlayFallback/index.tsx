import { useRouter } from 'next/router';

import Button from '@/components/@common/atoms/Button';
import DeferredComponent from '@/components/@util/DeferredComponent';
import {
  QuizPlayFallbackLinkButtonContainer,
  QuizPlayFallbackWrapper,
} from '@/components/quiz/molecules/QuizPlayFallback/styled';
import { TextBody } from '@/styles/common';
import { PostPageLayout } from '@/styles/layout';

const QuizPlayFallback = () => {
  const router = useRouter();
  return (
    <PostPageLayout>
      <DeferredComponent delay={500}>
        <QuizPlayFallbackWrapper>
          <h4>퀴즈 정보가 만료되었어요</h4>
          <TextBody>풀다가 나오셨죠..??</TextBody>
          <QuizPlayFallbackLinkButtonContainer>
            <Button width="100px" colorTheme="primary" onClick={() => router.replace('/')} size="small">
              홈으로
            </Button>
            <Button width="100px" colorTheme="cancel" onClick={() => router.back()} size="small">
              뒤로가기
            </Button>
          </QuizPlayFallbackLinkButtonContainer>
        </QuizPlayFallbackWrapper>
      </DeferredComponent>
    </PostPageLayout>
  );
};

export default QuizPlayFallback;
