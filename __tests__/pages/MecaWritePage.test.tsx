import MecaWritePage, { getServerSideProps } from '@/pages/mecas/write/[categoryId]';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { CATEGORIES } from '../__mocks__/msw/data';
import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../__mocks__/msw/server';
import { ENDPOINT } from '../__mocks__/msw/handlers';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaWritePage with SSR', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('부적절한 categoryId path에 대해 접근하면 not found 처리된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/meca/write',
      },
      params: {
        categoryId: ['hello'],
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '적절하지 않은 Meca Category로의 수정 페이지 접근');
  });

  it('존재하지 않는 categoryId path로 접근하면 not found 처리된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: '해당 카테고리가 존재하지 않음' }));
      }),
    );
    const mockedContext = {
      req: {
        url: '/meca/write',
      },
      params: {
        categoryId: 'cid01',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '해당 카테고리가 존재하지 않음');
  });

  it('본인이 가진 카테고리에 대한 Card 추가를 위해 접근하면 새 Card 작성 페이지가 식별된다,', async () => {
    const categoryId = CATEGORIES[0].categoryId;
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/meca/write',
      },
      res: {},
      params: {
        categoryId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', categoryId);
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(<MecaWritePage categoryId={props.categoryId} />, undefined, undefined, props.dehydratedState);
    const inputTitle = screen.getByRole('textbox', {
      name: 'input-meca-title',
    });
    const OxTagButton = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    const KeywordTagButton = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(inputTitle).toHaveValue('');
    expect(OxTagButton).toBeInTheDocument();
    expect(KeywordTagButton).toBeInTheDocument();
  });

  it('본인이 가진 카테고리에 존재하는 Card 수정을 위해 접근하면 기존 Card에 대한 수정 UI가 식별된다.', async () => {
    const categoryId = '01875422-c76a-51b5-16f0-9c47c79c3cae';
    const cardId = '01875422-d340-5865-67b1-4acfdc4eea33';
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/${categoryId}/me`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
      rest.get(`${ENDPOINT}/cards/${cardId}/me`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            cardId,
            title: 'title1212111a5',
            question: 'July',
            categoryId,
            cardType: 'KEYWORD',
            createdAt: '2023-04-06T10:16:21.195775',
            modifiedAt: '2023-04-06T10:16:44.784055',
            answer: 'ANSWER',
            description: '<p>some edit text</p>',
          }),
        );
      }),
    );
    const mockedContext = {
      req: {
        url: '/mecas/write',
      },
      res: {},
      params: {
        categoryId,
      },
      query: {
        cardId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', categoryId);
    expect(props).toHaveProperty('cardId', cardId);
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(
      <>
        <MecaWritePage categoryId={props.categoryId} cardId={props.cardId} />
      </>,
      undefined,
      undefined,
      props.dehydratedState,
    );
    const inputTitle = screen.getByRole('textbox', {
      name: 'input-meca-title',
    });
    const OxTagButton = screen.queryByRole('button', {
      name: /OX퀴즈/i,
    });
    const KeywordTagButton = screen.queryByRole('button', {
      name: /키워드/i,
    });
    expect(inputTitle).toHaveValue('title1212111a5');
    expect(OxTagButton).not.toBeInTheDocument();
    expect(KeywordTagButton).toBeInTheDocument();
  });

  it('카테고리에 존재하지 않는 Card에 대한 수정을 위해 접근하면 새 카드 등록 페이지가 식별된다.', async () => {
    const categoryId = '01875422-c76a-51b5-16f0-9c47c79c3cae';
    const cardId = '01875422-d340-5865-67b1-4acfdc4eea33';
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/${categoryId}/me`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
      rest.get(`${ENDPOINT}/cards/${cardId}/me`, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );
    const mockedContext = {
      req: {
        url: '/mecas/write',
      },
      res: {},
      params: {
        categoryId,
      },
      query: {
        cardId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', categoryId);
    expect(props).not.toHaveProperty('cardId');
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(<MecaWritePage {...props} />, undefined, undefined, props.dehydratedState);
    const inputTitle = screen.getByRole('textbox', {
      name: 'input-meca-title',
    });
    const OxTagButton = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    const KeywordTagButton = screen.getByRole('button', {
      name: /키워드/i,
    });
    expect(inputTitle).toHaveValue('');
    expect(OxTagButton).toBeInTheDocument();
    expect(KeywordTagButton).toBeInTheDocument();
  });
});
