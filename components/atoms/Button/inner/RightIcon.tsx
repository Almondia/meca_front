import styled from 'styled-components';

import Icon from '@/components/common/Icon';
import { IconType } from '@/components/common/Icons';

export const IconTextWrapper = styled.div`
  width: 16px;
  margin-bottom: -2px;
`;

const RightIcon = ({ icon, color }: { icon: IconType; color?: string }) => (
  <IconTextWrapper>
    <Icon icon={icon} color={color} size="1rem" />
  </IconTextWrapper>
);

type RightIconType = typeof RightIcon extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const rightIconType: RightIconType = RightIcon as any;

export default RightIcon;
