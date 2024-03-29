import styled, { CSSProp } from 'styled-components';

const PageTitleWrapper = styled.div`
  margin-bottom: 30px;
  h2 {
    word-wrap: break-word;
    font-size: 2rem;
    line-height: 2.375rem;
  }
  @media ${({ theme }) => theme.media.mobile} {
    margin-bottom: 15px;
  }
`;

const PageTitle = ({ children, style }: { children: React.ReactNode; style?: CSSProp }) => (
  <PageTitleWrapper css={style}>
    <h2>{children}</h2>
  </PageTitleWrapper>
);

export default PageTitle;
