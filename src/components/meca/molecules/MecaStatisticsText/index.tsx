import ColorizedScore from '@/components/@common/atoms/ColorizedScore';
import { TextCaption } from '@/styles/common';

interface MecaStatisticTextProps {
  tryCount?: number;
  scoreAvg?: number;
}

const MecaStatisticText = ({ tryCount, scoreAvg }: MecaStatisticTextProps) => (
  <TextCaption>
    {typeof tryCount === 'number' && (
      <span data-testid="id-meca-count">
        <strong>{tryCount}</strong>회 풀이&nbsp;
      </span>
    )}
    {!!tryCount && typeof scoreAvg === 'number' && (
      <span data-testid="id-meca-score">
        <strong>·</strong> 평균&nbsp;
        <ColorizedScore score={scoreAvg} size="caption" />점
      </span>
    )}
  </TextCaption>
);

export default MecaStatisticText;
