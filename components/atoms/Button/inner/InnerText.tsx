import { TextBodyTitle } from '@/styles/common';

const InnerText = ({ children }: { children: React.ReactNode }) => <TextBodyTitle>{children}</TextBodyTitle>;

type InnerTextType = typeof InnerText extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const innerTextType: InnerTextType = InnerText as any;

export default InnerText;
