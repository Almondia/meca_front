import styled from 'styled-components';

export const BodyWrapper = styled.div`
  padding: 5px 0;
`;

const ModalBody = ({ children }: { children: React.ReactNode }) => <BodyWrapper>{children}</BodyWrapper>;

type ModalBodyComponentType = typeof ModalBody extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalBodyComponentType: ModalBodyComponentType = ModalBody as any;

export default ModalBody;
