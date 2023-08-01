import Card from '@/components/molcules/Card';
import { CategoryType } from '@/types/domain';
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
  const PrivateBody = getInnerComponents(children, PrivateCategoryBodyComponentType);
  const SharedBody = getInnerComponents(children, SharedCategoryBodyComponentType);
  const srcImage = thumbnail ? getRemoteImageUrl(thumbnail) : '/images/noimage.png';

  return (
    <Card data-testid="id-category-card">
      <Card.Thumbnail
        src={srcImage}
        href={`/categories/${combineUUID(memberId, categoryId)}`}
        altText={`${title}-category-thumbnail`}
        preloadedInfo={{
          blurDataURL: blurThumbnail?.blurDataURL,
          width: 320,
          height: 160,
        }}
      />
      <Card.Title link={`/categories/${combineUUID(memberId, categoryId)}`}>{title}</Card.Title>
      <Card.Body>{PrivateBody || SharedBody}</Card.Body>
    </Card>
  );
};

CategoryCard.Shared = SharedCategoryBody;
CategoryCard.Private = PrivateCategoryBody;
export default CategoryCard;
