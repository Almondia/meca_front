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

const QuizHistoryTimeline = dynamic(() => import('@/components/quiz/organisms/QuizHistoryTimeline'));

export interface UserPageProps {
  memberId: string;
}

const MyPage = ({ memberId }: UserPageProps) => {
  const { user } = useUser();
  return (
    <>
      <MetaHead title={`${user?.name} Page`} />
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
  await useMecaHistory.prefetchInfiniteQuery('members', memberId as string, queryClient);
  return {
    memberId,
    cached: true,
  };
});

export default MyPage;
