import { useRouter } from 'next/router';

import { memo } from 'react';

import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import Modal from '@/components/@common/molecules/Modal';
import useQuizPhaseClear from '@/hooks/quiz/useQuizPhaseClear';
import useModal from '@/hooks/useModal';
import useRouteChangeBlocking from '@/hooks/useRouteChangeBlocking';

interface QuizPlayButtonGroupProps {
  succeedText: string;
  onSucceed: () => void;
}

const QuizPlayButtonGroup = memo(({ succeedText, onSucceed }: QuizPlayButtonGroupProps) => {
  const { visible: isConfirmModalVisible, open: openConfirmModal, close: closeConfirmModal } = useModal();
  const router = useRouter();
  const clearQuizResult = useQuizPhaseClear();
  const { offRouteChangeBlocking } = useRouteChangeBlocking(openConfirmModal);
  return (
    <>
      <ButtonGroup onSuccess={onSucceed} onCancel={router.back} successText={succeedText} cancelText="나가기" />
      {isConfirmModalVisible && (
        <Modal visible={isConfirmModalVisible} onClose={closeConfirmModal} hasCloseIcon={false}>
          <Modal.Body>현재 페이지로 다시 돌아올 수 없습니다?</Modal.Body>
          <Modal.ConfirmButton onClick={() => offRouteChangeBlocking(clearQuizResult)}>나가기</Modal.ConfirmButton>
          <Modal.CloseButton onClick={closeConfirmModal}>취소</Modal.CloseButton>
        </Modal>
      )}
    </>
  );
});

export default QuizPlayButtonGroup;
