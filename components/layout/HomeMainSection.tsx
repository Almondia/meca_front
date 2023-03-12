import styled from 'styled-components';

import { FlexCenter, FlexColumnCenter } from '@/styles/layout';

const HomeSectionWrapper = styled.div`
  ${FlexCenter};
  column-gap: 100px;
  padding: 240px 140px;
  @media ${({ theme }) => theme.media.tablet} {
    ${FlexColumnCenter};
    row-gap: 60px;
    padding: 180px 60px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    row-gap: 30px;
    padding: 90px 30px;
    h2 {
      font-size: 40px;
    }
    h4 {
      font-size: 24px;
    }
  }
`;

const HomeMainSection = ({ children }: { children: React.ReactNode }) => (
  <HomeSectionWrapper>{children}</HomeSectionWrapper>
);

export default HomeMainSection;
