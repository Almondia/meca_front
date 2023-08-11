import type { DefaultModalOptions } from '@/types/common';
import type { CategoryListContent } from '@/types/domain/category';

import Icon from '@/components/@common/atoms/Icon';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import Card from '@/components/@common/molecules/Card';
import IconTag from '@/components/@common/molecules/IconTag';
import CategoryStatisticsProgressBar from '@/components/category/molecules/CategoryStatisticsProgressBar';
import CategoryUpdateDropdown from '@/components/category/molecules/CategoryUpdateDropdown';
import CategoryDeleteDialog from '@/components/category/organisms/CategoryDeleteDialog';
import CategoryUpdateDialog from '@/components/category/organisms/CategoryUpdateDialog';
import { TextOverline } from '@/styles/common';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { combineUUID } from '@/utils/uuidHandler';

import * as CategoryCardStyled from './styled';

interface CategoryCardProps extends CategoryListContent {
  isMine?: boolean;
}

const CategoryCard = ({ category, member, statistics, likeCount, isMine }: CategoryCardProps) => {
  const { categoryId, memberId, title, thumbnail, blurThumbnail, shared } = category;
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
      <Card.Body>
        <CategoryCardStyled.Between>
          <CategoryCardStyled.BodyLeft>
            {statistics && isMine && <CategoryStatisticsProgressBar {...statistics} />}
            {member && !isMine && (
              <CategoryCardStyled.UserInfo>
                <AvatarUser {...member} />
              </CategoryCardStyled.UserInfo>
            )}
          </CategoryCardStyled.BodyLeft>
          <CategoryCardStyled.BodyRight>
            <Icon icon="Like" size="1rem" />
            <TextOverline style={{ textAlign: 'center' }}>{likeCount}</TextOverline>
          </CategoryCardStyled.BodyRight>
        </CategoryCardStyled.Between>
        {isMine && (
          <CategoryUpdateDropdown
            title={title}
            updateModalComponent={(props: DefaultModalOptions) =>
              CategoryUpdateDialog({ categoryId, categoryTitle: title, thumbnail, ...props })
            }
            deleteModalComponent={(props: DefaultModalOptions) =>
              CategoryDeleteDialog({ categoryId, categoryTitle: title, shared, ...props })
            }
          />
        )}
        {isMine && !shared && (
          <CategoryCardStyled.PrivateStateTag data-testid="id-private-tag">
            <IconTag icon="Lock" text="비공개" scale={0.85} />
          </CategoryCardStyled.PrivateStateTag>
        )}
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
