import { ReactElement } from 'react';

import { DefaultModalOptions } from '@/types/common';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import IconButton from '@/components/@common/molecules/IconButton';
import useModal from '@/hooks/useModal';

interface MecaCardUpdateMenuProps {
  title: string;
  updateLinkUrl: string;
  deleteModalComponent: (props: DefaultModalOptions) => ReactElement;
}

const MecaCardUpdateMenu = ({ title, updateLinkUrl, deleteModalComponent }: MecaCardUpdateMenuProps) => {
  const { visible: isDeleteModalVisible, open: openDeleteModal, close: closeDeleteModal } = useModal();
  return (
    <>
      <DropdownMenu
        wrapperComponent={({ onClick }) =>
          IconButton({
            name: `${title} 카테고리 수정 삭제 메뉴 열기 버튼`,
            icon: 'VerticalDot',
            iconSize: 16,
            color: 'var(--color-text)',
            onClick,
          })
        }
        scale={0.7}
      >
        <DropdownMenu.Menu href={updateLinkUrl}>수정하기</DropdownMenu.Menu>
        <DropdownMenu.Menu onClick={openDeleteModal}>삭제하기</DropdownMenu.Menu>
      </DropdownMenu>
      {deleteModalComponent({ visible: isDeleteModalVisible, onClose: closeDeleteModal })}
    </>
  );
};

export default MecaCardUpdateMenu;
