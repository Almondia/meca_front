import { useRouter } from 'next/router';

import React, { useState } from 'react';

import mecaApi from '@/apis/mecaApi';
import Button from '@/components/atoms/Button';
import ListControlGroup from '@/components/molcules/ListControlGroup';
import PostWriterInfo from '@/components/molcules/PostWriterInfo';
import QuizStartDialog from '@/components/organisms/QuizStartDialog';
import useCachedOrFetchQuery from '@/hooks/useCachedOrFetchQuery';
import useModal from '@/hooks/useModal';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

export interface CardControlProps {
  categoryId: string;
  categoryTitle: string;
  isMine: boolean;
  name: string;
  profile: string;
}

const CardControl = ({ categoryId, categoryTitle, isMine, name, profile }: CardControlProps) => {
  const router = useRouter();
  const { fetchOrGetQuery } = useCachedOrFetchQuery();
  const [quiznum, setQuizNum] = useState<number>(0);
  const { visible: isPlayModalVisible, open: playModalOpen, close: playModalClose } = useModal();
  const handlePlayClick = async () => {
    const { data } = await fetchOrGetQuery([queryKey.mecas, categoryId, 'count'], () =>
      mecaApi.getCountByCategoryId(categoryId),
    );
    const { count } = data;
    setQuizNum(count);
    if (!count) {
      alertToast('플레이할 카드가 없어요!', 'info');
      return;
    }
    playModalOpen();
  };
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
        <Button colorTheme="success" onClick={handlePlayClick}>
          <Button.RightIcon icon="Play" />
          <Button.InnerText>플레이</Button.InnerText>
        </Button>
        {isPlayModalVisible && (
          <QuizStartDialog
            title={categoryTitle}
            quizNum={quiznum}
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
