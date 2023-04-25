import { useRouter } from 'next/router';

import React from 'react';

import Button from '@/components/atoms/Button';
import ListControlGroup from '@/components/molcules/ListControlGroup';
import PostWriterInfo from '@/components/molcules/PostWriterInfo';
import QuizStartDialog from '@/components/molcules/QuizStartDialog';
import useModal from '@/hooks/useModal';

export interface CardControlProps {
  categoryId: string;
  categoryTitle: string;
  isMine: boolean;
  name: string;
  profile: string;
}

const CardControl = ({ categoryId, categoryTitle, isMine, name, profile }: CardControlProps) => {
  const router = useRouter();
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();
  return (
    <ListControlGroup>
      <ListControlGroup.Left>
        <PostWriterInfo name={name ?? 'user'} profile={profile} />
      </ListControlGroup.Left>
      <ListControlGroup.Right>
        {isMine && (
          <Button colorTheme="primary" onClick={() => router.push(`/mecas/write/${categoryId}`)}>
            추가하기 +
          </Button>
        )}
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
      </ListControlGroup.Right>
    </ListControlGroup>
  );
};

export default React.memo(CardControl);
