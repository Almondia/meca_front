import React from 'react';
import styled from 'styled-components';

const PageTitleWrapper = styled.div`
  margin-bottom: 30px;
`;

const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <PageTitleWrapper>
    <h4>{children}</h4>
  </PageTitleWrapper>
);

export default PageTitle;
