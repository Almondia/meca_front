import styled from 'styled-components';

import Icon from '@/components/atoms/Icon';
import { IconType } from '@/components/icons/type';

export const IconTextWrapper = styled(Icon)`
  width: 16px;
  margin-bottom: -2px;
`;

const RightIcon = ({ icon, color }: { icon: IconType; color?: string }) => (
  <IconTextWrapper icon={icon} color={color} />
);

type RightIconType = typeof RightIcon extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const rightIconType: RightIconType = RightIcon as any;

export default RightIcon;
