import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import CardTitle from '@/components/atoms/CardTitle';
import DropdownMenu from '@/components/atoms/DropdownMenu';
import ProgressBar from '@/components/atoms/ProgressBar';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';
import useModal from '@/hooks/useModal';
import { COLOR } from '@/styles/constants';
import { IMAGE_SERVER } from '@/utils/constants';

import {
  CategoryCardInfoSection,
  CategoryCardThumbnailSection,
  CategoryCardWrapper,
  ProgressesInfoContainer,
} from './styled';

import CategoryDeleteDialog from '../CategoryDeleteDialog';
import CategoryUpdateDialog from '../CategoryUpdateDialog';

export interface CategoryCardProps {
  categoryId: string;
  title: string;
  maxCardCount?: number;
  solvedCardCount?: number;
  answeredRate?: number;
  thumbnail: string;
}

const CategoryCard = ({
  categoryId,
  title,
  answeredRate = 0,
  maxCardCount = 0,
  solvedCardCount = 0,
  thumbnail,
}: CategoryCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { visible: isUpdateModalVisible, open: updateModalOpen, close: updateModalClose } = useModal();
  const [src, setSrc] = useState<string>(thumbnail ? `${IMAGE_SERVER}/${thumbnail}` : '/images/noimage.png');
  const router = useRouter();
  useEffect(() => {
    if (thumbnail) {
      setSrc(`${IMAGE_SERVER}/${thumbnail}`);
      return;
    }
    setSrc('/images/noimage.png');
  }, [thumbnail]);
  return (
    <CategoryCardWrapper data-testid="id-category-card">
      <CategoryCardThumbnailSection hasValidImage={src !== '/images/noimage.png'}>
        <Image
          src={src}
          alt={`${title}-thumbnail`}
          fill
          onError={() => setSrc('/images/noimage.png')}
          onClick={() => router.push(`/me/categories/${categoryId}`)}
        />
      </CategoryCardThumbnailSection>
      <CategoryCardInfoSection>
        <CardTitle link={`/me/categories/${categoryId}`}>{title}</CardTitle>
        <ProgressesInfoContainer>
          <p>문제개수</p>
          <ProgressBar
            type="devision"
            maxValue={maxCardCount}
            currentValue={solvedCardCount}
            backgroundColor={[COLOR.brand3, COLOR.brand1]}
          />
        </ProgressesInfoContainer>
        <ProgressesInfoContainer>
          <p> 정답률 </p>
          <ProgressBar
            type="percentage"
            maxValue={100}
            currentValue={answeredRate}
            backgroundColor={['#71D4B6', COLOR.success]}
          />
        </ProgressesInfoContainer>
        <DotMenuOpener top="14px" right="14px">
          <DropdownMenu>
            <DropdownMenu.Contents href="" onClick={updateModalOpen}>
              수정하기
            </DropdownMenu.Contents>
            <DropdownMenu.Contents href="" onClick={deleteModalOpen}>
              삭제하기
            </DropdownMenu.Contents>
            {isDeleteModalVisible && (
              <CategoryDeleteDialog
                categoryId={categoryId}
                categoryTitle={title}
                visible={isDeleteModalVisible}
                onClose={deleteModalClose}
              />
            )}
            {isUpdateModalVisible && (
              <CategoryUpdateDialog
                categoryId={categoryId}
                categoryTitle={title}
                thumbnail={thumbnail}
                visible={isUpdateModalVisible}
                onClose={updateModalClose}
              />
            )}
          </DropdownMenu>
        </DotMenuOpener>
      </CategoryCardInfoSection>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
