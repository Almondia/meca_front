import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useState } from 'react';

import mecaApi from '@/apis/mecaApi';
import Button from '@/components/atoms/Button';
import AvatarUser from '@/components/molcules/AvatarUser';
import BetweenControlGroup from '@/components/molcules/BetweenControlGroup';
import useCachedOrFetchQuery from '@/hooks/useCachedOrFetchQuery';
import useModal from '@/hooks/useModal';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const QuizStartDialog = dynamic(() => import('@/components/organisms/QuizStartDialog'));

export interface MecaControlProps {
  categoryId: string;
  categoryTitle: string;
  isMine: boolean;
  name: string;
  profile: string;
  hasAuth?: boolean;
}

const CardControl = ({ categoryId, categoryTitle, isMine, name, profile, hasAuth }: MecaControlProps) => {
  const router = useRouter();
  const { fetchOrGetQuery } = useCachedOrFetchQuery();
  const [quiznum, setQuizNum] = useState<number>(0);
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();

  const handlePlayClick = async () => {
    const { data } = await fetchOrGetQuery([queryKey.mecas, categoryId, 'count'], () =>
      mecaApi.getCountByCategoryId(categoryId),
    );
    const { count } = data;
    if (!count) {
      alertToast('플레이할 카드가 없어요!', 'info');
      return;
    }
    setQuizNum(count);
    playModalOpen();
  };
  return (
    <BetweenControlGroup>
      <BetweenControlGroup.Left>
        <AvatarUser name={name ?? 'user'} profile={profile} />
      </BetweenControlGroup.Left>
      <BetweenControlGroup.Right>
        {isMine && (
          <Button colorTheme="primary" onClick={() => router.push(`/mecas/write/${categoryId}`)} size="small">
            추가하기 +
          </Button>
        )}
        {hasAuth && (
          <Button colorTheme="success" onClick={handlePlayClick} size="small">
            <Button.RightIcon icon="Play" />
            <Button.InnerText>플레이</Button.InnerText>
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
      </BetweenControlGroup.Right>
    </BetweenControlGroup>
  );
};

export default React.memo(CardControl);
