/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';

import cardHistoryApi from '@/apis/cardHistoryApi';
import AuthPageProvider from '@/components/common/AuthPageProvider';
import MetaHead from '@/components/common/MetaHead';
import { RelativeDateText } from '@/components/common/RelativeDateText';
import PostBody from '@/components/molcules/PostBody';
import PostSubInfo from '@/components/molcules/PostSubInfo';
import QuizHistoryList from '@/components/organisms/QuizHistoryList';
import UserProfileHeader from '@/components/organisms/UserProfileHeader';
import useMecaHistory from '@/hooks/meca/useMecaHistory';
import useUser from '@/hooks/user/useUser';
import { ssrAspect } from '@/libs/renderAspect';
import queryKey from '@/query/queryKey';
import { TextCaption } from '@/styles/common';
import { Devide, PostSection } from '@/styles/layout';
import { PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';

export interface UserPageProps {
  memberId: string;
}

const UserPage = ({ memberId }: UserPageProps) => {
  const { user } = useUser();
  const { cardHistoryList, fetchNextPage } = useMecaHistory('memberId', memberId);
  return (
    <AuthPageProvider>
      <MetaHead title="Meca - My Page" />
      {user && (
        <PostSection>
          <UserProfileHeader {...user} />
          <Devide />
          <br />
          <PostBody>
            <PostBody.Title>기본정보</PostBody.Title>
            <PostBody.Content hasBackground={false} hasIndent={false}>
              <PostSubInfo columnGutter="12px" rowGutter="12px">
                <PostSubInfo.Content title="Email">
                  <TextCaption>{user.email}</TextCaption>
                </PostSubInfo.Content>
                <PostSubInfo.Content title="가입일">
                  <TextCaption>
                    <RelativeDateText date={user.createdAt} />
                  </TextCaption>
                </PostSubInfo.Content>
                <PostSubInfo.Content title="SNS">
                  <TextCaption>{user.oauthType}</TextCaption>
                </PostSubInfo.Content>
              </PostSubInfo>
            </PostBody.Content>
          </PostBody>
          <Devide />
          <br />
          <PostBody>
            <PostBody.Title>퀴즈 기록</PostBody.Title>
            <PostBody.Content hasBackground={false} hasIndent={false}>
              <QuizHistoryList excludeRows={['user']} historyList={cardHistoryList} fetchNextPage={fetchNextPage} />
            </PostBody.Content>
          </PostBody>
        </PostSection>
      )}
    </AuthPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps = ssrAspect(async (context, queryClient, memberId) => {
  if (!memberId) {
    throw { message: '회원정보가 존재하지 않음' };
  }
  await queryClient.prefetchInfiniteQuery(
    [queryKey.history, memberId],
    () => cardHistoryApi.getHistoriesByMemberId({ id: memberId }),
    {
      getNextPageParam: (lastPage) => lastPage.hasNext ?? undefined,
    },
  );
  context.res.setHeader('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
  return {
    memberId,
  };
});

export default UserPage;
