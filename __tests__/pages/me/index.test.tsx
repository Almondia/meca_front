import { renderQuery } from '../../utils';
import { screen, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import MyPage, { getServerSideProps } from '@/pages/me';
import { mockedGetMecaHistoryByMemberApi, mockedGetUserApi } from '@/mock/api';
import { MOCK_MEMBER } from '@/mock/data';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MyPage', () => {
  const { memberId, name, email, oauthType } = MOCK_MEMBER;
  beforeEach(() => {
    implementServer([restHandler(mockedGetUserApi), restHandler(mockedGetMecaHistoryByMemberApi)]);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('MyPage가 식별된다.', async () => {
    const mockedContext = {
      params: {
        memberId: memberId,
      },
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('memberId');
    expect(props).toHaveProperty('dehydratedState');
    await waitFor(() => renderQuery(<MyPage memberId={props.memberId} />, undefined, undefined, props.dehydratedState));
    const username = screen.getByRole('heading', { name: name });
    const profileImage = screen.getByRole('img', { name: `${memberId}-avatar` });
    expect(username).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText(oauthType)).toBeInTheDocument();
    const historyTimelineItems = screen.getAllByTestId('id-timeline-item');
    expect(historyTimelineItems).toHaveLength(2);
  });

  it('비인증 상태에서 접근 시 401 처리된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: '',
    });
    const mockedContext = {
      params: {
        memberId: memberId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorStatus', 401);
  });

  it('사용자 정보 조회에 실패하면 404처리된다.', async () => {
    implementServer([restHandler(mockedGetUserApi, { status: 400, message: 'no user' })]);
    const mockedContext = {
      params: {
        memberId: memberId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorStatus', 404);
    expect(props).toHaveProperty('errorMessage', 'no user');
  });

  it('history 목록 조회에 실패하면 기록 목록이 0개로 식별된다.', async () => {
    implementServer([restHandler(mockedGetMecaHistoryByMemberApi, { status: 400 })]);
    const mockedContext = {
      params: {
        memberId: memberId,
      },
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('memberId');
    expect(props).toHaveProperty('dehydratedState');
    await waitFor(() => renderQuery(<MyPage memberId={props.memberId} />, undefined, undefined, props.dehydratedState));
    expect(screen.queryByTestId('id-history-list')).not.toBeInTheDocument();
    expect(await screen.findByText(/아직 기록이 없습니다/i));
  });
});
