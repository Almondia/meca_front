import { renderQuery } from '../utils';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { MOCK_CATEGORY_ID, MOCK_MEMBERI_ID } from '../__mocks__/msw/data';
import CategoryById, { getServerSideProps } from '@/pages/categories/[memberCategoryId]';
import { screen } from '@testing-library/react';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { combineUUID } from '@/utils/uuidHandler';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaListPage with SSR', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('회원 본인의 카드 목록 요청에 대해 카드 목록이 보여진다.', async () => {
    const combinedUUID = combineUUID(MOCK_MEMBERI_ID, MOCK_CATEGORY_ID);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/categories/' + combinedUUID,
      },
      params: {
        memberCategoryId: combinedUUID,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', MOCK_CATEGORY_ID);
    expect(props).toHaveProperty('isMine', true);
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(<CategoryById {...props} />, undefined, undefined, props.dehydratedState);
    const addButton = screen.getByRole('button', { name: /추가하기/i });
    const dotButtons = screen.getAllByRole('button', { name: /카드 수정 삭제 메뉴 오프너/i });
    const noListText = screen.queryByText(/목록이 존재하지 않습니다/i);
    const profileImage = screen.queryByRole('img', { name: /avatar/i });
    expect(addButton).toBeInTheDocument();
    expect(dotButtons[0]).toBeInTheDocument();
    expect(noListText).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });

  it('비정상적인 category params로의 접근시 not-found 처리 된다.', async () => {
    const categoryId = ['5'];
    const mockedContext = {
      req: {
        url: '/categories/' + categoryId,
      },
      params: {
        memberCategoryId: categoryId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '잘못된 페이지 요청');
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
    const combinedUUID = combineUUID(MOCK_MEMBERI_ID, MOCK_CATEGORY_ID);
    const mockedContext = {
      req: {
        url: '/categories/' + combinedUUID,
      },
      params: {
        memberCategoryId: combinedUUID,
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
    const combinedUUID = combineUUID(MOCK_MEMBERI_ID, MOCK_CATEGORY_ID);
    const mockedContext = {
      req: {
        url: '/categories/' + combinedUUID,
      },
      params: {
        memberCategoryId: combinedUUID,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', MOCK_CATEGORY_ID);
    expect(props).toHaveProperty('isMine', false);
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(<CategoryById {...props} />, undefined, undefined, props.dehydratedState);
    const addButton = screen.queryByRole('button', { name: /추가하기/i });
    const playButton = screen.queryByRole('button', { name: /플레이/i });
    const dotButton = screen.queryByRole('button', { name: /카드 수정 삭제 메뉴 오프너/i });
    const profileImage = screen.queryByRole('img', { name: /임현규-avatar/i });
    expect(addButton).not.toBeInTheDocument();
    expect(dotButton).not.toBeInTheDocument();
    expect(playButton).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });
});
