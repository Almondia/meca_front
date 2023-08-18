/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import PostSection from '@/components/@common/molecules/PostSection';
import MetaHead from '@/components/@util/MetaHead';
import UserBasicInfo from '@/components/user/molecules/UserBasicInfo';
import UserProfileHeader from '@/components/user/organisms/UserProfileHeader';
import useMecaHistory from '@/hooks/meca/useMecaHistory';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import { Devide, PostPageLayout } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

const QuizHistoryTimeline = dynamic(() => import('@/components/quiz/organisms/QuizHistoryTimeline'));

export interface UserPageProps {
  memberId: string;
}

const UserPage = ({ memberId }: UserPageProps) => {
  const { user } = useUser();
  return (
    <>
      <MetaHead title={`${user?.name ?? 'User'} Page`} />
      {user && (
        <PostPageLayout>
          <UserProfileHeader {...user} />
          <Devide />
          <br />
          <PostSection>
            <PostSection.Title>기본정보</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <UserBasicInfo {...user} />
            </PostSection.Body>
          </PostSection>
          <Devide />
          <br />
          <PostSection>
            <PostSection.Title>퀴즈 기록</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <QuizHistoryTimeline resourceType="members" resourceId={memberId} />
            </PostSection.Body>
          </PostSection>
        </PostPageLayout>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, memberId) => {
  if (!memberId) {
    throw { message: '회원정보가 존재하지 않음' };
  }
  await useMecaHistory.prefetchInfiniteQuery('members', memberId, queryClient);
  context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return {
    memberId,
  };
});

export default UserPage;
