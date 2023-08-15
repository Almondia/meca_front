import { memo, useCallback, useEffect, useRef, useState } from 'react';

import LinkButton from '@/components/@common/atoms/LinkButton';
import { debouncedFunc } from '@/utils/common';

import * as ST from './styled';

export interface QuizEllipsisContentProps {
  title: string;
  content: string;
}

const QuizEllipsisContent = memo(({ title, content }: QuizEllipsisContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState<boolean | undefined>(undefined);
  const [isMoreButtonActive, setIsMoreButtonActive] = useState(false);
  const checkEllipsisActive = useCallback(() => {
    const contentCurrent = contentRef.current;
    if (contentCurrent && contentCurrent.scrollHeight > contentCurrent.clientHeight) {
      setIsEllipsisActive(true);
      return;
    }
    setIsEllipsisActive(undefined);
  }, []);
  const debouncedCheckEllipsisActive = debouncedFunc(checkEllipsisActive, 500);

  useEffect(() => {
    checkEllipsisActive();
  }, [checkEllipsisActive]);

  useEffect(() => {
    if (!isMoreButtonActive) {
      window.addEventListener('resize', debouncedCheckEllipsisActive);
      return () => {
        window.removeEventListener('resize', debouncedCheckEllipsisActive);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoreButtonActive]);

  const handleMoreButtonClick = useCallback(() => {
    setIsEllipsisActive(false);
    setIsMoreButtonActive(true);
  }, []);

  return (
    <ST.Wrapper>
      <ST.TitleBox>[{title}]</ST.TitleBox>
      <ST.ContentBox ref={contentRef} ellipsis={isEllipsisActive}>
        {content}
      </ST.ContentBox>
      {isEllipsisActive && (
        <ST.MoreLinkBox>
          <LinkButton onClick={handleMoreButtonClick}>더보기</LinkButton>
        </ST.MoreLinkBox>
      )}
    </ST.Wrapper>
  );
});

export default QuizEllipsisContent;
