/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import IconTag from '@/components/atoms/IconTag';

export const MecaTagWrapper = styled(IconTag)<{ isNotOpaque: boolean }>`
  opacity: ${(props) => (props.isNotOpaque ? 0.5 : 1)};
`;
