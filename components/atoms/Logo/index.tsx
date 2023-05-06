import Image from 'next/image';

const LOGO_SIZE = {
  large: [100, 50],
  normal: [80, 40],
  small: [60, 30],
} as const;

export interface LogoProps {
  size: keyof typeof LOGO_SIZE;
}

const Logo = ({ size = 'normal' }: LogoProps) => (
  <Image src="/images/logo.svg" alt="로고" width={LOGO_SIZE[size][0]} height={LOGO_SIZE[size][1]} priority />
);

export default Logo;
