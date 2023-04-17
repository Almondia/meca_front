import { renderQuery } from '../utils';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { MOCK_CATEGORY_ID } from '../__mocks__/msw/data';
import CategoryById, { getServerSideProps } from '@/pages/[memberId]/categories/[categoryId]';
import { screen } from '@testing-library/react';
import { QueryClient, hydrate } from '@tanstack/react-query';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaListPage with SSR', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('회원 본인의 카드 목록 요청에 대해 카드 목록이 보여진다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/abc01/categories/' + MOCK_CATEGORY_ID,
      },
      query: {
        categoryId: MOCK_CATEGORY_ID,
      },
      params: {
        memberId: 'abc01',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', MOCK_CATEGORY_ID);
    expect(props).toHaveProperty('isMine', true);
    expect(props).toHaveProperty('dehydratedState');
    const queryClient = new QueryClient();
    hydrate(queryClient, props.dehydratedState);
    renderQuery(<CategoryById categoryId={props.categoryId} isMine={props.isMine} />, undefined, queryClient);
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    const dotButtons = screen.getAllByRole('button', {
      name: /카드 수정 삭제 메뉴 오프너/i,
    });
    const noListText = screen.queryByText(/목록이 존재하지 않습니다/i);
    const profileImage = screen.queryByRole('img', {
      name: /-profile-image/i,
    });
    expect(addButton).toBeInTheDocument();
    expect(dotButtons[0]).toBeInTheDocument();
    expect(noListText).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });

  it('비정상적인 category params로의 접근이 루트(/)로 redirect 된다.', async () => {
    const categoryId = ['5'];
    const mockedContext = {
      req: {
        url: '/abc01/categories/' + categoryId,
      },
      params: {
        memberId: 'abc01',
      },
      query: {
        categoryId: categoryId,
      },
    } as unknown as GetServerSidePropsContext;
    const { redirect } = (await getServerSideProps(mockedContext)) as any;
    expect(redirect).toHaveProperty('destination', '/');
  });

  it('공유되지 않은 타인의 카드 목록 요청에 대해 접근 시 not-found 처리 된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/${MOCK_CATEGORY_ID}/share`, (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            message: '비정상적인 접근',
            status: 403,
          }),
        );
      }),
    );
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const mockedContext = {
      req: {
        url: '/abc01/categories/' + MOCK_CATEGORY_ID,
      },
      query: {
        categoryId: MOCK_CATEGORY_ID,
      },
      params: {
        memberId: 'abc01',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '비정상적인 접근');
  });

  it('본인 것이 아닌 공유 카드 목록 요청일 경우 개인용 UI가 식별되지 않는다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/${MOCK_CATEGORY_ID}/share`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            contents: [
              {
                cardInfo: {
                  cardId: '018778b0-2f94-072f-336f-f2cbf49d077d',
                  title: 'Rustic Granite Chips',
                  question: 'March',
                  categoryId: '018778af-d4e7-4fe0-14d5-759b8f2c39b0',
                  cardType: 'OX_QUIZ',
                  createdAt: '2023-04-13T12:37:05.175337',
                  modifiedAt: '2023-04-13T12:37:05.175337',
                  answer: 'O',
                  description: 'edit text',
                },
                memberInfo: {
                  memberId: '018778af-88bf-c490-544a-65b30c4ef9fa',
                  name: '임현규',
                  email: null,
                  profile: null,
                  role: 'USER',
                  createdAt: '2023-04-13T12:36:22.544664',
                  modifiedAt: '2023-04-13T12:36:22.544664',
                  deleted: false,
                  oauthType: 'KAKAO',
                },
              },
            ],
            hasNext: '018778b0-2148-8c6c-a6ed-bb91cad56205',
            pageSize: 2,
            sortOrder: 'DESC',
            category: {
              categoryId: '018778af-d4e7-4fe0-14d5-759b8f2c39b0',
              memberId: '018778af-88bf-c490-544a-65b30c4ef9fa',
              thumbnail: 'https://www.google.c',
              title: 'title12352',
              createdAt: '2023-04-13T12:36:41.964544',
              modifiedAt: '2023-04-13T12:36:44.912056',
              shared: true,
              deleted: false,
            },
          }),
        );
      }),
    );
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const mockedContext = {
      req: {
        url: '/abc01/categories/' + MOCK_CATEGORY_ID,
      },
      query: {
        categoryId: MOCK_CATEGORY_ID,
      },
      params: {
        memberId: 'abc01',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', MOCK_CATEGORY_ID);
    expect(props).toHaveProperty('isMine', false);
    expect(props).toHaveProperty('dehydratedState');
    const queryClient = new QueryClient();
    hydrate(queryClient, props.dehydratedState);
    renderQuery(<CategoryById categoryId={props.categoryId} isMine={props.isMine} />, undefined, queryClient);
    const addButton = screen.queryByRole('button', {
      name: /추가하기/i,
    });
    const dotButton = screen.queryByRole('button', {
      name: /카드 수정 삭제 메뉴 오프너/i,
    });
    const profileImage = screen.queryByRole('img', {
      name: /임현규-profile-image/i,
    });
    expect(addButton).not.toBeInTheDocument();
    expect(dotButton).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });
});
