/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import mecaApi from '@/apis/mecaApi';
import MecaWrite from '@/components/organisms/MecaWrite';
import { ssrAspect } from '@/libs/renderAspect';
import { PostSection } from '@/styles/layout';

const MecaWritePage = ({ categoryId }: { categoryId: string }) => (
  <PostSection>
    <MecaWrite categoryId={categoryId} />
  </PostSection>
);

// TODO: 카드 수정에 대한 처리도 필요하다.
export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient) => {
  const { categoryId } = context.query;
  if (!categoryId || typeof categoryId !== 'string') {
    throw { url: '/' };
  }
  const response = await Promise.allSettled([mecaApi.getMyMecaList({ categoryId, pageSize: 1 })]);
  if (response[0].status === 'rejected') {
    throw { url: '/' };
  }
});

export default MecaWritePage;
