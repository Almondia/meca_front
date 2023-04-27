import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';
import MecaById, { getServerSideProps } from '@/pages/mecas/me/[cardId]';
import { ME } from '../__mocks__/msw/data';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaById Page', () => {
  /**
     *  "title": "Small Soft Computer",
        "question": "February",
        "categoryId": "0187934c-d471-9365-fe25-9fa63e4ba45c",
        "cardType": "OX_QUIZ",
  */
  it('회원 본인의 카드 조회 페이지가 보여진다.', async () => {
    renderQuery(<MecaById cardId="0187934c-d471-9365-fe25-9fa63e4ba45c" />);
    const { name } = ME;
    const title = await screen.findByRole('heading', { name: /Small Soft Computer/i });
    const username = await screen.findByText(name);
    const updateLink = screen.getByRole('link', { name: '수정하기' });
    const deleteLink = screen.getByRole('link', { name: '삭제하기' });
    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(updateLink).toBeInTheDocument();
    expect(deleteLink).toBeInTheDocument();
  });

  describe('SSR test', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('회원 본인이 가진 카드에 대해 요청하면 페이지가 즉시 식별된다.', async () => {
      const cardId = '0187934c-d471-9365-fe25-9fa63e4ba45c';
      const { name } = ME;

      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        req: {
          url: '/meca/me/' + cardId,
        },
        params: {
          cardId,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('cardId', cardId);
      expect(props).toHaveProperty('dehydratedState');
      renderQuery(<MecaById cardId={cardId} />, undefined, undefined, props.dehydratedState);
      const title = screen.getByRole('heading', { name: /Small Soft Computer/i });
      const username = screen.getByText(name);
      expect(title).toBeInTheDocument();
      expect(username).toBeInTheDocument();
    });

    it('존재하지 않는 카드에 대해 요청하면 404 처리된다.', async () => {
      const cardId = '0187934c-d471-9365-fe25-9fa63e4ba45c';
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      server.use(
        rest.get(`${ENDPOINT}/cards/:cardId/me`, (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ message: '해당 자원을 찾을 수 없음', status: 400 }));
        }),
      );
      const mockedContext = {
        req: {
          url: '/meca/me/' + cardId,
        },
        params: {
          cardId,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '해당 자원을 찾을 수 없음');
    });
  });
});
