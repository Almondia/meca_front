import styled from 'styled-components';

import Button from '@/components/atoms/Button';

export const ModalCloseButtonWrapper = styled(Button)`
  display: block;
`;

const ModalCloseButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <ModalCloseButtonWrapper colorTheme="cancel" size="small" onClick={onClick}>
    {children}
  </ModalCloseButtonWrapper>
);

type ModalCloseButtonComponentType = typeof ModalCloseButton extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalCloseButtonComponentType: ModalCloseButtonComponentType = ModalCloseButton as any;

export default ModalCloseButton;
