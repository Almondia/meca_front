/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import RelativeDate from '@/components/@common/atoms/RelativeDate';
import PostSection from '@/components/@common/molecules/PostSection';
import PostSubInfo from '@/components/@common/molecules/PostSubInfo';
import AuthPageProvider from '@/components/@util/AuthPageProvider';
import MetaHead from '@/components/@util/MetaHead';
import UserProfileHeader from '@/components/user/organisms/UserProfileHeader';
import useMecaHistory from '@/hooks/meca/useMecaHistory';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import { TextCaption } from '@/styles/common';
import { Devide, PostPageLayout } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

const QuizHistoryList = dynamic(() => import('@/components/quiz/organisms/QuizHistoryList'));

export interface UserPageProps {
  memberId: string;
}

const UserPage = ({ memberId }: UserPageProps) => {
  const { user } = useUser();
  return (
    <AuthPageProvider>
      <MetaHead title="Meca - My Page" />
      {user && (
        <PostPageLayout>
          <UserProfileHeader {...user} />
          <Devide />
          <br />
          <PostSection>
            <PostSection.Title>기본정보</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <PostSubInfo columnGutter="12px" rowGutter="12px">
                <PostSubInfo.Content title="Email">
                  <TextCaption>{user.email}</TextCaption>
                </PostSubInfo.Content>
                <PostSubInfo.Content title="가입일">
                  <TextCaption>
                    <RelativeDate date={user.createdAt} />
                  </TextCaption>
                </PostSubInfo.Content>
                <PostSubInfo.Content title="SNS">
                  <TextCaption>{user.oauthType}</TextCaption>
                </PostSubInfo.Content>
              </PostSubInfo>
            </PostSection.Body>
          </PostSection>
          <Devide />
          <br />
          <PostSection>
            <PostSection.Title>퀴즈 기록</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <QuizHistoryList resourceType="members" resourceId={memberId} excludeRows={['user']} />
            </PostSection.Body>
          </PostSection>
        </PostPageLayout>
      )}
    </AuthPageProvider>
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
