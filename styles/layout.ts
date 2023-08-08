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

export const TextAreaBox = css`
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
`;

const PageLayout = styled.main`
  margin: 0 auto;
  padding: 90px 0px;
  @media ${({ theme }) => theme.media.tablet} {
    padding: 60px 0;
    max-width: calc(100% - 30px);
  }
  @media ${({ theme }) => theme.media.mobile} {
    padding: 30px 0;
  }
`;

export const ListPageLayout = styled(PageLayout)`
  max-width: 1376px;
  @media ${({ theme }) => theme.media.desktop} {
    max-width: 1024px;
  }
  @media (max-width: 1056px) {
    max-width: calc(100% - 60px);
  }
`;

export const PostPageLayout = styled(PageLayout)`
  max-width: 864px;
  @media ${({ theme }) => theme.media.tablet} {
    width: 768px;
    max-width: calc(100% - 30px);
  }
`;

export const ErrorPageLayout = styled.main`
  position: fixed;
  left: 0;
  top: 60px;
  ${FlexColumnCenter};
  row-gap: 30px;
  width: 100vw;
  height: 90vh;
`;

export const Devide = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-lightgray);
  margin: 24px 0;
`;
