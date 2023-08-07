import styled from 'styled-components';

import { TextBodyTitle } from '@/styles/common';

export const TitleWrapper = styled(TextBodyTitle)`
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSize.huge};
`;

const ModalTitle = ({ children }: { children: React.ReactNode }) => <TitleWrapper>{children}</TitleWrapper>;

type ModalTitleComponentType = typeof ModalTitle extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalTitleComponentType: ModalTitleComponentType = ModalTitle as any;

export default ModalTitle;
