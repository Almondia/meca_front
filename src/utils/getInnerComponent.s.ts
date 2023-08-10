import { Children, isValidElement, JSXElementConstructor, ReactElement } from 'react';

const getInnerComponents = (
  children: React.ReactNode,
  innerComponent: (props: any) => ReactElement<any, string | JSXElementConstructor<any>>,
) => {
  const childrenArray = Children.toArray(children);
  const result = childrenArray.filter((child) => isValidElement(child) && child.type === innerComponent).slice(0, 2);
  return result.length === 0 ? undefined : result;
};

export default getInnerComponents;
