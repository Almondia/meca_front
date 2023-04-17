import Image from 'next/image';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import CardTitle from '@/components/atoms/CardTitle';
import { CategoryType } from '@/types/domain';
import { IMAGE_SERVER } from '@/utils/constants';
import getInnerComponents from '@/utils/getInnerComponent.s';

import PrivateCategoryBody, { PrivateCategoryBodyComponentType } from './inner/PrivateCategoryBody';
import SharedCategoryBody, { SharedCategoryBodyComponentType } from './inner/SharedCategoryBody';
import { CategoryCardInfoSection, CategoryCardThumbnailSection, CategoryCardWrapper } from './styled';

export interface CategoryCardProps extends Omit<CategoryType, 'shared'> {
  children: React.ReactNode;
}

const CategoryCard = ({ categoryId, title, thumbnail, memberId, children }: CategoryCardProps) => {
  const [src, setSrc] = useState<string>(thumbnail ? `${IMAGE_SERVER}/${thumbnail}` : '/images/noimage.png');
  const router = useRouter();
  const PrivateBody = getInnerComponents(children, PrivateCategoryBodyComponentType);
  const SharedBody = getInnerComponents(children, SharedCategoryBodyComponentType);

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
          onClick={() => router.push(`/${memberId}/categories/${categoryId}`)}
        />
      </CategoryCardThumbnailSection>
      <CategoryCardInfoSection>
        <CardTitle link={`/${memberId}/categories/${categoryId}`}>{title}</CardTitle>
        {PrivateBody || SharedBody}
      </CategoryCardInfoSection>
    </CategoryCardWrapper>
  );
};

CategoryCard.Shared = SharedCategoryBody;
CategoryCard.Private = PrivateCategoryBody;
export default CategoryCard;
