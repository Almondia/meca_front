import { useEffect, useState } from 'react';

import Card from '@/components/molcules/Card';
import { CategoryType } from '@/types/domain';
import { CATEGORY_THUMBNAIL_BLUR_URL } from '@/utils/constants';
import getInnerComponents from '@/utils/getInnerComponent.s';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { combineUUID } from '@/utils/uuidHandler';

import PrivateCategoryBody, { PrivateCategoryBodyComponentType } from './inner/PrivateCategoryBody';
import SharedCategoryBody, { SharedCategoryBodyComponentType } from './inner/SharedCategoryBody';

export interface CategoryCardProps extends Omit<CategoryType, 'shared'> {
  children: React.ReactNode;
  memberId: string;
  categoryId: string;
}

const CategoryCard = ({ categoryId, title, thumbnail, memberId, children, blurThumbnail }: CategoryCardProps) => {
  const [src, setSrc] = useState<string>(thumbnail ? getRemoteImageUrl(thumbnail) : '/images/noimage.png');
  const PrivateBody = getInnerComponents(children, PrivateCategoryBodyComponentType);
  const SharedBody = getInnerComponents(children, SharedCategoryBodyComponentType);

  useEffect(() => {
    if (thumbnail) {
      setSrc(getRemoteImageUrl(thumbnail));
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
        preloadedInfo={{
          blurDataURL: blurThumbnail?.blurDataURL ?? CATEGORY_THUMBNAIL_BLUR_URL,
          width: 320,
          height: 160,
        }}
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
