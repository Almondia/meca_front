/* eslint-disable import/prefer-default-export */

import Link from 'next/link';

import { CardTitleWrapper } from '../styled';

interface CardTitleProps {
  children: React.ReactNode;
  link?: string;
}

/** 카드 컴포넌트 타이틀에 사용하는 컴포넌트 */
export const CardTitle = ({ children, link }: CardTitleProps) => (
  <CardTitleWrapper>
    {link ? (
      <Link href={link} prefetch={false}>
        {children}
      </Link>
    ) : (
      <p>{children}</p>
    )}
  </CardTitleWrapper>
);

export const CardTitleComponentType: typeof CardTitle extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardTitle as any;
