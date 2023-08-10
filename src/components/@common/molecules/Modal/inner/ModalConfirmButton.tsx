import styled from 'styled-components';

import Button from '@/components/@common/atoms/Button';

export const ModalConfirmButtonWrapper = styled(Button)`
  display: block;
`;

const ModalConfirmButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <ModalConfirmButtonWrapper colorTheme="primary" size="small" onClick={onClick}>
    {children}
  </ModalConfirmButtonWrapper>
);

type ModalConfirmButtonComponentType = typeof ModalConfirmButton extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalConfirmButtonComponentType: ModalConfirmButtonComponentType = ModalConfirmButton as any;

export default ModalConfirmButton;
