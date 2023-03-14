import styled, { css } from 'styled-components';

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

export const ListSection = styled.div`
  padding: 100px 140px;
  @media ${({ theme }) => theme.media.tablet} {
    padding: 60px 60px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    padding: 60px 30px;
  }
`;

export const Devide = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray400);
  margin: 24px 0;
`;
