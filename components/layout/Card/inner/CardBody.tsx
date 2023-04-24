/* eslint-disable react/jsx-no-useless-fragment */
export const CardBody = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const CardBodyComponentType: typeof CardBody extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardBody as any;
