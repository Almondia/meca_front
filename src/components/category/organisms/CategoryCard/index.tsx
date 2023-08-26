import { memo } from 'react';

import type { CategoryListContent } from '@/types/domain/category';

import Icon from '@/components/@common/atoms/Icon';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import Card from '@/components/@common/molecules/Card';
import IconTag from '@/components/@common/molecules/IconTag';
import CategoryCardMenu from '@/components/category/molecules/CategoryCardUpdateMenu';
import CategoryStatisticsProgressBar from '@/components/category/molecules/CategoryStatisticsProgressBar';
import CategoryDeleteDialog from '@/components/category/organisms/CategoryDeleteDialog';
import CategoryUpdateDialog from '@/components/category/organisms/CategoryUpdateDialog';
import { TextOverline } from '@/styles/common';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { combineUUID } from '@/utils/uuidHandler';

import * as ST from './styled';

interface CategoryCardProps extends CategoryListContent {
  isMine?: boolean;
}

const CategoryCard = memo(({ category, member, statistics, likeCount, isMine }: CategoryCardProps) => {
  const { categoryId, memberId, title, thumbnail, blurThumbnail, shared } = category;
  const srcImage = thumbnail ? getRemoteImageUrl(thumbnail) : '/images/noimage.png';
  return (
    <Card data-testid="id-category-card">
      <Card.Thumbnail
        src={srcImage}
        href={`/category/${combineUUID(memberId, categoryId)}`}
        altText={`${title}-category-thumbnail`}
        preloadedInfo={{
          blurDataURL: blurThumbnail?.blurDataURL,
          width: 320,
          height: 160,
        }}
      />
      <Card.Title link={`/category/${combineUUID(memberId, categoryId)}`}>{title}</Card.Title>
      <Card.Body>
        <ST.Between>
          <ST.BodyLeft>
            {statistics && isMine && <CategoryStatisticsProgressBar {...statistics} />}
            {member && !isMine && (
              <ST.UserInfo>
                <AvatarUser {...member} />
              </ST.UserInfo>
            )}
          </ST.BodyLeft>
          <ST.BodyRight>
            <Icon icon="Like" size="1rem" />
            <TextOverline style={{ textAlign: 'center' }}>{likeCount}</TextOverline>
          </ST.BodyRight>
        </ST.Between>
        {isMine && (
          <ST.PrivateMenu>
            <CategoryCardMenu
              title={title}
              updateModalComponent={(props) =>
                CategoryUpdateDialog({ categoryId, categoryTitle: title, isShared: shared, thumbnail, ...props })
              }
              deleteModalComponent={(props) =>
                CategoryDeleteDialog({ categoryId, categoryTitle: title, shared, ...props })
              }
            />
          </ST.PrivateMenu>
        )}
        {isMine && !shared && (
          <ST.PrivateStateTag data-testid="id-private-tag">
            <IconTag icon="Lock" text="비공개" scale={0.85} />
          </ST.PrivateStateTag>
        )}
      </Card.Body>
    </Card>
  );
});

export default CategoryCard;
