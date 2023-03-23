/* eslint-disable react/button-has-type */

import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import LoginCard from '@/components/organisms/LoginCard';
import HomeMainSection from '@/components/layout/HomeMainSection';
import { FlexColumn } from '@/styles/layout';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import userApi from '@/apis/userApi';

import MyCategory from './categories/me';

const IntroduceContainer = styled.div`
  ${FlexColumn};
  row-gap: 30px;
  max-width: 540px;
  @media ${({ theme }) => theme.media.tablet} {
    text-align: center;
  }
`;

const LoginCardContainer = styled.div`
  box-shadow: var(--shadow-normal);
`;

export default function Home({ hasAuth }: { hasAuth?: boolean }) {
  if (hasAuth) {
    return <MyCategory />;
  }
  return (
    <HomeMainSection>
      <IntroduceContainer>
        <h2>Meca 서비스 간단 설명</h2>
        <h4>조금 더 긴 서비스 설명을 설명해보고 설명하고 설명해보아요 배경을 꾸며요</h4>
      </IntroduceContainer>
      <LoginCardContainer>
        <LoginCard />
      </LoginCardContainer>
    </HomeMainSection>
  );
}

export const getServerSideProps: GetServerSideProps = ssrAspect();
