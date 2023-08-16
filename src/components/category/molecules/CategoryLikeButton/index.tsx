import { useRecoilValue } from 'recoil';

import { hasAuthState } from '@/atoms/common';
import LikeButton from '@/components/@common/molecules/LikeButton';
import { CategoryLikeButtonWrapper } from '@/components/category/molecules/CategoryLikeButton/styled';
import useCategoryLike from '@/hooks/category/useCategoryLike';

interface CategoryLikeButtonProps {
  categoryId: string;
  initialLikeCount?: number;
}

const CategoryLikeButton = ({ categoryId, initialLikeCount = 0 }: CategoryLikeButtonProps) => {
  const hasAuth = useRecoilValue(hasAuthState);
  const { hasLike, likeCount, postLike } = useCategoryLike(categoryId, initialLikeCount);
  const handlePostLikeClick = () => {
    postLike();
    return !hasLike;
  };
  return (
    <CategoryLikeButtonWrapper>
      <LikeButton
        buttonName="카테고리 추천 버튼"
        likeCount={likeCount}
        onClick={handlePostLikeClick}
        defaultActiveState={hasLike}
        disabled={!hasAuth}
      />
    </CategoryLikeButtonWrapper>
  );
};

export default CategoryLikeButton;
