import ProgressBar from '@/components/atoms/ProgressBar';
import { COLOR } from '@/styles/constants';
import DropdownMenu from '@/components/atoms/DropdownMenu';
import CardTitle from '@/components/atoms/CardTitle';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';

import { CategoryCardWrapper, ProgressesInfoContainer } from './styled';

export interface CategoryCardProps {
  categoryId: string;
  title: string;
  maxCardCount?: number;
  solvedCardCount?: number;
  answeredRate?: number;
}

const CategoryCard = ({
  categoryId,
  title,
  answeredRate = 0,
  maxCardCount = 0,
  solvedCardCount = 0,
}: CategoryCardProps) => (
  <CategoryCardWrapper>
    <CardTitle link={`/category/${categoryId}`}>{title}</CardTitle>
    <DotMenuOpener top="14px" right="14px">
      <DropdownMenu>
        {/* TODO: 클릭 modal 창 추가하기 */}
        <DropdownMenu.Contents href="">수정하기</DropdownMenu.Contents>
        <DropdownMenu.Contents href="">삭제하기</DropdownMenu.Contents>
      </DropdownMenu>
    </DotMenuOpener>
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
        backgroundColor={[COLOR.brand3, COLOR.brand1]}
      />
    </ProgressesInfoContainer>
  </CategoryCardWrapper>
);

export default CategoryCard;
