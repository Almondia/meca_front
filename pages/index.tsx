/* eslint-disable react/button-has-type */
import { GetServerSideProps } from 'next';

import HomeCarousel from '@/components/organisms/HomeCarousel';
import { ssrAspect } from '@/libs/renderAspect';

export default function Home() {
  return <HomeCarousel />;
}

export const getServerSideProps: GetServerSideProps = ssrAspect();
