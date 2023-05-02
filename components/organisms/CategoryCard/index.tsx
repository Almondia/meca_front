import { useEffect, useState } from 'react';

import Card from '@/components/layout/Card';
import { CategoryType } from '@/types/domain';
import { IMAGE_SERVER } from '@/utils/constants';
import getInnerComponents from '@/utils/getInnerComponent.s';
import { combineUUID } from '@/utils/uuidHandler';

import PrivateCategoryBody, { PrivateCategoryBodyComponentType } from './inner/PrivateCategoryBody';
import SharedCategoryBody, { SharedCategoryBodyComponentType } from './inner/SharedCategoryBody';

export interface CategoryCardProps extends Required<Omit<CategoryType, 'shared'>> {
  children: React.ReactNode;
}

const CategoryCard = ({ categoryId, title, thumbnail, memberId, children }: CategoryCardProps) => {
  const [src, setSrc] = useState<string>(thumbnail ? `${IMAGE_SERVER}/${thumbnail}` : '/images/noimage.png');
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
    <Card data-testid="id-category-card">
      <Card.Thumbnail
        src={src}
        href={`/categories/${combineUUID(memberId, categoryId)}`}
        altText={`${title}-category-thumbnail`}
        hasStaticHeight
        onError={() => setSrc('/images/noimage.png')}
      />
      <Card.Title link={`/categories/${combineUUID(memberId, categoryId)}`}>{title}</Card.Title>
      <Card.Body>{PrivateBody || SharedBody}</Card.Body>
    </Card>
  );
};

CategoryCard.Shared = SharedCategoryBody;
CategoryCard.Private = PrivateCategoryBody;
export default CategoryCard;
