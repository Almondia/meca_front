import { ReactElement } from 'react';

import type { DefaultModalOptions } from '@/types/common';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import IconButton from '@/components/@common/molecules/IconButton';
import useModal from '@/hooks/useModal';

export interface CategoryUpdateDropdownProps {
  title: string;
  updateModalComponent: (props: DefaultModalOptions) => ReactElement;
  deleteModalComponent: (props: DefaultModalOptions) => ReactElement;
}

const CategoryUpdateDropdown = ({ title, updateModalComponent, deleteModalComponent }: CategoryUpdateDropdownProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { visible: isUpdateModalVisible, open: updateModalOpen, close: updateModalClose } = useModal();
  return (
    <>
      <DropdownMenu
        wrapperComponent={({ onClick }) =>
          IconButton({
            name: `${title} 카드 수정 삭제 메뉴 열기 버튼`,
            icon: 'VerticalDot',
            iconSize: 16,
            color: 'var(--color-text)',
            onClick,
          })
        }
        scale={0.7}
      >
        <DropdownMenu.Menu onClick={updateModalOpen}>수정하기</DropdownMenu.Menu>
        <DropdownMenu.Menu onClick={deleteModalOpen}>삭제하기</DropdownMenu.Menu>
      </DropdownMenu>
      {updateModalComponent({ visible: isUpdateModalVisible, onClose: updateModalClose })}
      {deleteModalComponent({ visible: isDeleteModalVisible, onClose: deleteModalClose })}
    </>
  );
};

export default CategoryUpdateDropdown;
