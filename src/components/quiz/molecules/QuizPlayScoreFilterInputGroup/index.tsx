import { useCallback } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import Tab from '@/components/@common/molecules/Tab';
import useInput from '@/hooks/useInput';

const QuizPlayScoreFilterInputGroup = ({
  input: scoreRange,
  onInputChange: onChangeScoreRange,
  setInput: setScoreRange,
}: Pick<ReturnType<typeof useInput>, 'input' | 'onInputChange' | 'setInput'>) => {
  // eslint-disable-next-line no-nested-ternary
  const selectionForcedIndexValue = scoreRange === '100' ? 1 : scoreRange === '0' ? 0 : -1;
  const handleScoreRangeSetButtonClick = useCallback((option: string) => {
    setScoreRange(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <InputGroup>
      <InputGroup.Label>점수 필터링</InputGroup.Label>
      <InputGroup.Input.Range
        value={scoreRange}
        max={100}
        min={0}
        step={10}
        name="retry-score-input"
        onChange={onChangeScoreRange}
        ariaLabel="id-retry-score-range"
      />
      <Tab
        forceSelectedIndex={selectionForcedIndexValue}
        tabButtonProps={[
          { name: '오답문제', onClick: () => handleScoreRangeSetButtonClick('0') },
          { name: '모든문제', onClick: () => handleScoreRangeSetButtonClick('100') },
        ]}
      />
      <InputGroup.Description descLists={[`${scoreRange}점 이하의 문제를 풀이합니다`]} />
    </InputGroup>
  );
};

export default QuizPlayScoreFilterInputGroup;
