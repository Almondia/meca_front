import type { CategoryStatistics } from '@/types/domain/category';

import ProgressBar from '@/components/@common/molecules/ProgressBar';
import { COLOR } from '@/styles/constants';

import { CategoryStatisticsProgressBarWrapper } from './styled';

const CategoryStatisticsProgressBar = ({ scoreAvg, solveCount, totalCount }: CategoryStatistics) => (
  <CategoryStatisticsProgressBarWrapper>
    <div>
      <p>문제개수</p>
      <ProgressBar
        type="devision"
        maxValue={totalCount}
        currentValue={solveCount}
        backgroundColor={[COLOR.brand3, COLOR.brand1]}
      />
    </div>
    <div>
      <p> 정답률 </p>
      <ProgressBar
        type="percentage"
        maxValue={100}
        currentValue={scoreAvg}
        backgroundColor={['#71D4B6', COLOR.success]}
      />
    </div>
  </CategoryStatisticsProgressBarWrapper>
);

export default CategoryStatisticsProgressBar;
