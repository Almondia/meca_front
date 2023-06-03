import { renderQuery } from '../utils';
import { screen, waitFor } from '@testing-library/react';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import UserPage, { getServerSideProps } from '@/pages/user/me/[memberId]';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

const HISTORY_LIST = {
  contents: [
    {
      cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd00',
      solvedUserId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
      solvedUserName: '이름이엄청길수도있어요',
      userAnswer: 'answer',
      score: 62,
      categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
      cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
      createdAt: '2023-05-28T21:34:22.6543507',
      title: 'title',
      question: '박동석의 MBTI는 무엇일까요?',
      answer: 'answer',
      cardType: 'KEYWORD',
    },
    {
      cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
      solvedUserId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
      solvedUserName: 'name',
      userAnswer: '1',
      score: 0,
      categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
      cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
      createdAt: '2023-05-24T21:34:22.6543507',
      title: 'title',
      question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
      answer: '1',
      cardType: 'MULTI_CHOICE',
    },
  ],
  hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
  pageSize: 2,
};

describe('User MyPage', () => {
  beforeEach(() => {
    server.use(
      rest.get(`${ENDPOINT}/histories/members/:id`, (req, res, ctx) => {
        const { pageSize, hasNext } = req.params;
        return res(ctx.status(200), ctx.json({ ...HISTORY_LIST }));
      }),
      rest.get(`${ENDPOINT}/members/me`, (_, res, ctx) => {
        return res(
          ctx.json({
            memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
            name: '임현규',
            email: 'abc@abc.com',
            role: 'USER',
            oauthType: 'KAKAO',
            createdAt: '2023-03-11T12:56:22.954816',
            profile: '/images/noimage.png',
          }),
        );
      }),
    );
  });
  it('MyPage가 식별된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      params: {
        memberId: ['0187934c-bd9d-eb51-758f-3b3723a0d3a7'],
      },
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('memberId');
    expect(props).toHaveProperty('dehydratedState');
    await waitFor(() =>
      renderQuery(<UserPage memberId={props.memberId} />, undefined, undefined, props.dehydratedState),
    );
    const username = screen.getByRole('heading', { name: '임현규' });
    const profileImage = screen.getByRole('img', { name: '0187934c-bd9d-eb51-758f-3b3723a0d3a7-avatar' });
    expect(username).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
    expect(screen.getByText('abc@abc.com')).toBeInTheDocument();
    expect(screen.getByText('2023년 03월 11일')).toBeInTheDocument();
    expect(screen.getByText('KAKAO')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    const tableContents = screen.getAllByTestId('id-history-list');
    expect(tableContents).toHaveLength(2);
  });

  it('토큰이 없을 경우 401 처리된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: '',
    });
    const mockedContext = {
      params: {
        memberId: ['0187934c-bd9d-eb51-758f-3b3723a0d3a7'],
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorStatus', 401);
  });

  it('사용자 정보 조회에 실패하면 404처리된다.', async () => {
    server.resetHandlers(
      rest.get(`${ENDPOINT}/members/me`, (_, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'no user', status: 400 }));
      }),
    );
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      params: {
        memberId: ['0187934c-bd9d-eb51-758f-3b3723a0d3a7'],
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorStatus', 404);
    expect(props).toHaveProperty('errorMessage', 'no user');
  });

  it('history 목록 조회에 실패하면 에러 없이 기록 목록이 0개로 식별된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/histories/members/:id`, (req, res, ctx) => {
        const { pageSize, hasNext } = req.params;
        return res(ctx.status(400), ctx.json({ message: 'bad request', status: 400 }));
      }),
    );
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      params: {
        memberId: ['0187934c-bd9d-eb51-758f-3b3723a0d3a7'],
      },
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('memberId');
    expect(props).toHaveProperty('dehydratedState');
    await waitFor(() =>
      renderQuery(<UserPage memberId={props.memberId} />, undefined, undefined, props.dehydratedState),
    );
    expect(screen.queryByTestId('id-history-list')).not.toBeInTheDocument();
    expect(screen.getByText(/아직 기록이 없습니다/i));
  });
});
