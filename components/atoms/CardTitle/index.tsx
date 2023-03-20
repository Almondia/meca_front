import { useRouter } from 'next/router';

import styled from 'styled-components';

import { TextBodyTitle } from '@/styles/common';

const CardTitleWrapper = styled(TextBodyTitle)`
  display: inline;
  margin-bottom: 6px;
  :hover {
    cursor: pointer;
    color: var(--color-brand);
  }
`;

export interface CardTitleProps {
  /** [필수] 카드 제목(내용물) */
  children: React.ReactNode;
  /** [선택] 링크가 있다면 링크 경로를 입력 */
  link?: string;
  /** [선택] 클릭 이벤트 */
  onClick?: () => void;
}

/** 카드 컴포넌트들 타이틀에 사용하는 컴포넌트 */
const CardTitle = ({ children, link, onClick }: CardTitleProps) => {
  const router = useRouter();
  const handleClick = () => {
    onClick?.();
    router.push(link ?? '');
  };
  return <CardTitleWrapper onClick={handleClick}>{children}</CardTitleWrapper>;
};

export default CardTitle;
