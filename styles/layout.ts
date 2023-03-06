import { css } from 'styled-components';

export const Flex = css`
  display: flex;
`;

export const FlexCenter = css`
  ${Flex};
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = css`
  ${Flex};
  flex-direction: column;
`;

export const FlexSpaceBetween = css`
  ${Flex};
  justify-content: space-between;
`;

export const FlexColumnCenter = css`
  ${FlexColumn};
  justify-content: center;
  align-items: center;
`;

export const FlexColumnSpaceBetween = css`
  ${FlexColumn}
  justify-content: space-between;
`;

export const FlexColumnAlignCenter = css`
  ${FlexColumn};
  align-items: center;
`;
