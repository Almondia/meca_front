/* eslint-disable react/jsx-no-useless-fragment */
import { useRef } from 'react';

import { createPortal } from 'react-dom';

import IconButton from '@/components/atoms/IconButton';
import useClickAway from '@/hooks/useClickAway';
import { DefaultModalOptions } from '@/types/common';
import { hasBrowser } from '@/utils/common';
import getInnerComponents from '@/utils/getInnerComponent.s';

import ModalBody, { modalBodyComponentType } from './inner/ModalBody';
import ModalCloseButton, { modalCloseButtonComponentType } from './inner/ModalCloseButton';
import ModalConfirmButton, { modalConfirmButtonComponentType } from './inner/ModalConfirmButton';
import ModalTitle, { modalTitleComponentType } from './inner/ModalTitle';
import { Background, CloseIconButton, ModalButtonGroup, ModalContainer, ModalWrapper } from './styled';

export interface ModalProps extends DefaultModalOptions {
  /**
   * [필수] 내부에 `ReactNode`를 규칙에 맞게 선언해 UI에 표시합니다.
   * - `<Modal.Title>`: 타이틀을 표시합니다.
   * - `<Modal.Body>`: 내부 컨텐츠를 표시합니다.
   * - `<Modal.ConfirmButton>`: 확인 등 특수한 동작을 가지는 버튼을 하단 버튼그룹에 표시합니다.
   * - `<Modal.CloseButton>`: 닫는 버튼을 하단 버튼그룹에 표시합니다.
   * 규격 이외의 컴포넌트는 식별되지 않습니다.
   */
  children: React.ReactNode;
  /** [선택] 닫기 아이콘이 존재하는지 여부입니다. */
  hasCloseIcon?: boolean;
  /** [선택] 외부를 클릭했을 때 모달창을 닫을지 여부입니다. */
  isClickAwayable?: boolean;
}

/**
 * Modal Dialog 컴포넌트입니다.
 * - 외부를 클릭하면 기본으로 닫히며 선택할 수 있습니다.
 * - visible 속성과 onClose 함수로 보여지는 것을 제어할 수 있습니다.
 */
const Modal = ({ children, visible = false, hasCloseIcon = true, isClickAwayable = false, onClose }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(
    ref,
    () => {
      isClickAwayable && onClose();
    },
    true,
    true,
  );
  if (!hasBrowser()) {
    return null;
  }
  const modalPortalDiv = document.querySelector('#modal-root') ?? document.body;
  if (!modalPortalDiv) {
    return null;
  }
  const titles = getInnerComponents(children, modalTitleComponentType);
  const body = getInnerComponents(children, modalBodyComponentType);
  const closeButton = getInnerComponents(children, modalCloseButtonComponentType);
  const confirmButton = getInnerComponents(children, modalConfirmButtonComponentType);
  return (
    <>
      {visible &&
        createPortal(
          <Background>
            <ModalWrapper>
              <ModalContainer ref={ref}>
                {hasCloseIcon && (
                  <CloseIconButton>
                    <IconButton icon="Ax" onClick={onClose} />
                  </CloseIconButton>
                )}
                {titles}
                {body}
                {(confirmButton || closeButton) && (
                  <ModalButtonGroup>
                    {closeButton}
                    {confirmButton}
                  </ModalButtonGroup>
                )}
              </ModalContainer>
            </ModalWrapper>
          </Background>,
          modalPortalDiv,
        )}
    </>
  );
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.ConfirmButton = ModalConfirmButton;
Modal.CloseButton = ModalCloseButton;

export default Modal;
