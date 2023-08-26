import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { memo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/@common/atoms/Button';
import Icon from '@/components/@common/atoms/Icon';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import useQuizInfoBeforePlay from '@/hooks/quiz/useQuizInfoBeforePlay';
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
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();

  const handlePlayClick = async () => {
    const beforePlayList = await useQuizInfoBeforePlay.fetchOrGetQuery(categoryId, queryClient);
    if (beforePlayList.length === 0) {
      alertToast('플레이할 카드가 없어요!', 'info');
      return;
    }
    playModalOpen();
  };
  return (
    <BetweenSection>
      <BetweenSection.Left>
        <AvatarUser name={name ?? 'user'} profile={profile} />
      </BetweenSection.Left>
      <BetweenSection.Right>
        {isMine && (
          <Button colorTheme="primary" onClick={() => router.push(`/category/${categoryId}/write-card/`)} size="small">
            추가하기 +
          </Button>
        )}
        {hasAuth && (
          <Button colorTheme="success" onClick={handlePlayClick} size="small">
            플레이 <Icon icon="Play" size="0.875rem" style={{ transform: 'translateY(2px)' }} />
          </Button>
        )}
        {isPlayModalVisible && (
          <QuizStartDialog
            title={categoryTitle}
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
