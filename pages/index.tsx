/* eslint-disable react/button-has-type */
import { GetServerSideProps } from 'next';

import styled from 'styled-components';

import HomeMainSection from '@/components/layout/HomeMainSection';
import { ssrAspect } from '@/libs/renderAspect';
import { FlexColumn } from '@/styles/layout';

const IntroduceContainer = styled.div`
  ${FlexColumn};
  row-gap: 30px;
  max-width: 540px;
  @media ${({ theme }) => theme.media.tablet} {
    text-align: center;
  }
`;

export default function Home() {
  return (
    <HomeMainSection>
      <IntroduceContainer>
        <h2>Meca 서비스 간단 설명</h2>
        <h4>조금 더 긴 서비스 설명을 설명해보고 설명하고 설명해보아요 배경을 꾸며요</h4>
      </IntroduceContainer>
    </HomeMainSection>
  );
}

export const getServerSideProps: GetServerSideProps = ssrAspect();
