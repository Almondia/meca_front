import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { memo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/@common/atoms/Button';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import useMecaCount from '@/hooks/meca/useMecaCount';
import useModal from '@/hooks/useModal';
import alertToast from '@/utils/toastHandler';

const QuizStartDialog = dynamic(() => import('@/components/quiz/organisms/QuizStartDialog'), { ssr: false });

interface MecaControlProps {
  categoryId: string;
  categoryTitle: string;
  isMine: boolean;
  name: string;
  profile: string;
  hasAuth?: boolean;
}

const MecaControl = memo(({ categoryId, categoryTitle, isMine, name, profile, hasAuth }: MecaControlProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [quiznum, setQuizNum] = useState<number>(0);
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();

  const handlePlayClick = async () => {
    const { count } = await useMecaCount.fetchOrGetQuery(categoryId, queryClient);
    if (count <= 0) {
      alertToast('플레이할 카드가 없어요!', 'info');
      return;
    }
    setQuizNum(count);
    playModalOpen();
  };
  return (
    <BetweenSection>
      <BetweenSection.Left>
        <AvatarUser name={name ?? 'user'} profile={profile} />
      </BetweenSection.Left>
      <BetweenSection.Right>
        {isMine && (
          <Button colorTheme="primary" onClick={() => router.push(`/mecas/write/${categoryId}`)} size="small">
            추가하기 +
          </Button>
        )}
        {hasAuth && (
          <Button colorTheme="success" onClick={handlePlayClick} size="small">
            플레이 ▶
          </Button>
        )}
        {isPlayModalVisible && (
          <QuizStartDialog
            title={categoryTitle}
            quizNum={quiznum}
            categoryId={categoryId}
            visible={isPlayModalVisible}
            onClose={playModalClose}
          />
        )}
      </BetweenSection.Right>
    </BetweenSection>
  );
});

export default MecaControl;
