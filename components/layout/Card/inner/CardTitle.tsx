/* eslint-disable import/prefer-default-export */

import Link from 'next/link';

import { CardTitleWrapper } from '../styled';

interface CardTitleProps {
  children: React.ReactNode;
  link: string;
}

/** 카드 컴포넌트들 타이틀에 사용하는 컴포넌트 */
export const CardTitle = ({ children, link }: CardTitleProps) => (
  <CardTitleWrapper>
    <Link href={link}>{children}</Link>
  </CardTitleWrapper>
);

export const CardTitleComponentType: typeof CardTitle extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardTitle as any;
