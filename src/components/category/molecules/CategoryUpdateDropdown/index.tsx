import { ReactElement } from 'react';

import type { DefaultModalOptions } from '@/types/common';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
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
      <DropdownMenu scale={0.7} top="14px" right="6px" name={`${title}제목의 카테고리 수정 삭제 버튼 오프너`}>
        <DropdownMenu.Menu href="" onClick={updateModalOpen}>
          수정하기
        </DropdownMenu.Menu>
        <DropdownMenu.Menu href="" onClick={deleteModalOpen}>
          삭제하기
        </DropdownMenu.Menu>
      </DropdownMenu>
      {updateModalComponent({ visible: isUpdateModalVisible, onClose: updateModalClose })}
      {deleteModalComponent({ visible: isDeleteModalVisible, onClose: deleteModalClose })}
    </>
  );
};

export default CategoryUpdateDropdown;
