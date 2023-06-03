/* eslint-disable @typescript-eslint/no-throw-literal */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import cardHistoryApi from '@/apis/cardHistoryApi';
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

const NotFound = dynamic(() => import('@/pages/404'), { ssr: false });

export interface UserPageProps {
  memberId: string;
}

const UserPage = ({ memberId }: UserPageProps) => {
  const { user } = useUser();
  const { cardHistoryList, fetchNextPage } = useMecaHistory('memberId', memberId);
  if (!user) {
    return <NotFound />;
  }
  const DateText = RelativeDateText({ date: user.createdAt });
  return (
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
                <DateText />
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
          <QuizHistoryList
            excludeRows={['user', 'card-id']}
            historyList={cardHistoryList}
            fetchNextPage={fetchNextPage}
          />
        </PostBody.Content>
      </PostBody>
    </PostSection>
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
  context.res.setHeader('Cache-Control', 'public, max-age=1, stale-while-revalidate=179');
  return {
    memberId,
  };
});

export default UserPage;
