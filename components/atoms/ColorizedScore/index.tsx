import React, { useCallback } from 'react';

import { FONT_SIZE } from '@/styles/constants';
import { BAD_QUIZ_SCORE, IDEAL_QUIZ_SCORE } from '@/utils/constants';

import { ColorizedScoreWrapper } from './styled';

export interface ColorizedScoreProps {
  score: number;
  fixedValue?: number;
  minimumIdealScore?: number;
  maximumBadScore?: number;
  size: keyof typeof FONT_SIZE;
  hasPostFixText?: boolean;
}

const ColorizedScore = ({
  score,
  fixedValue = 0,
  size,
  minimumIdealScore = IDEAL_QUIZ_SCORE,
  maximumBadScore = BAD_QUIZ_SCORE,
  hasPostFixText,
}: ColorizedScoreProps) => {
  const fractionDigits = Math.max(Math.min(fixedValue, 4), 0);
  const adjustedScore = Math.max(Math.min(score, 100), 0);
  const getScoreColor = useCallback((scoreValue: number, minIdeal: number, maxBad: number) => {
    if (scoreValue >= minIdeal) {
      return 'var(--color-success)';
    }
    if (scoreValue <= Math.min(minIdeal, maxBad)) {
      return 'var(--color-error)';
    }
    return 'var(--color-text)';
  }, []);
  return (
    <ColorizedScoreWrapper size={size} color={getScoreColor(adjustedScore, minimumIdealScore, maximumBadScore)}>
      {adjustedScore.toFixed(fractionDigits)}
      {hasPostFixText ? '점' : ''}
    </ColorizedScoreWrapper>
  );
};

export default ColorizedScore;
