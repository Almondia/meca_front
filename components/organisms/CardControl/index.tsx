import { useRouter } from 'next/router';

import React from 'react';

import Button from '@/components/atoms/Button';
import useModal from '@/hooks/useModal';
import QuizStartDialog from '@/components/molcules/QuizStartDialog';

import { CardControlComponentsContainer, CardControlWrapper } from './styled';

export interface CardControlProps {
  categoryId: string;
  categoryTitle: string;
}

const CardControl = ({ categoryId, categoryTitle }: CardControlProps) => {
  const router = useRouter();
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();
  return (
    <CardControlWrapper>
      <CardControlComponentsContainer>
        {/* TODO: UI 넣을 것 */}
        &nbsp;
      </CardControlComponentsContainer>
      <CardControlComponentsContainer>
        <Button colorTheme="primary" onClick={() => router.push(`/me/write/${categoryId}`)}>
          추가하기 +
        </Button>
        <Button colorTheme="success" onClick={playModalOpen}>
          <Button.RightIcon icon="Play" />
          <Button.InnerText>플레이</Button.InnerText>
        </Button>
        {/* TODO: 퀴즈 숫자 받을 수 있게 되면 수정할 것 */}
        {isPlayModalVisible && (
          <QuizStartDialog
            title={categoryTitle}
            quizNum={3}
            categoryId={categoryId}
            visible={isPlayModalVisible}
            onClose={playModalClose}
          />
        )}
      </CardControlComponentsContainer>
    </CardControlWrapper>
  );
};

export default React.memo(CardControl);
