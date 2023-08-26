import { renderQuery } from '../../../utils';
import WriteCardByCategoryIdPage, { getServerSideProps } from '@/pages/category/[categoryId]/write-card';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { MOCK_CATEGORY_ID, MOCK_MECA } from '@/mock/data';
import { screen } from '@testing-library/react';
import { implementServer, resetServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import {
  mockedGetAuthUserdMecaApi,
  mockedGetAuthUserMecaListApi,
  mockedGetMecaCountApi,
  mockedGetUserApi,
} from '@/mock/api';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('WriteCardByCategoryIdPage', () => {
  beforeEach(() => {
    implementServer([
      restHandler(mockedGetUserApi),
      restHandler(() => mockedGetMecaCountApi(1)),
      restHandler(mockedGetAuthUserdMecaApi),
    ]);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('부적절한 categoryId path에 대해 접근하면 not found 처리된다.', async () => {
    const mockedContext = {
      params: {
        categoryId: ['hello'],
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '적절하지 않은 Meca Category로의 수정 페이지 접근');
  });

  it('존재하지 않는 categoryId path로 접근하면 not found 처리된다.', async () => {
    resetServer([
      restHandler(mockedGetUserApi),
      restHandler(() => mockedGetMecaCountApi(1), { status: 400, message: '해당 카테고리가 존재하지 않음' }),
    ]);
    const mockedContext = {
      params: {
        categoryId: 'cid01',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '해당 카테고리가 존재하지 않음');
  });

  it('본인이 가진 카테고리에 대한 Card 추가를 위해 접근하면 새 Card 작성 페이지가 식별된다,', async () => {
    const categoryId = MOCK_CATEGORY_ID;
    const mockedContext = {
      params: {
        categoryId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId', categoryId);
    expect(props).toHaveProperty('dehydratedState');
    renderQuery(
      <WriteCardByCategoryIdPage categoryId={props.categoryId} />,
      undefined,
      undefined,
      props.dehydratedState,
    );
    const inputTitle = await screen.findByRole('textbox', {
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
    const { categoryId, title } = MOCK_MECA;
    const cardId = '01875422-d340-5865-67b1-4acfdc4eea33';
    implementServer([restHandler(mockedGetAuthUserMecaListApi)]);
    const mockedContext = {
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
      <WriteCardByCategoryIdPage categoryId={props.categoryId} cardId={props.cardId} />,
      undefined,
      undefined,
      props.dehydratedState,
    );
    const inputTitle = await screen.findByRole('textbox', {
      name: 'input-meca-title',
    });
    const OxTagButton = screen.getByRole('button', {
      name: /OX퀴즈/i,
    });
    const KeywordTagButton = screen.queryByRole('button', {
      name: /키워드/i,
    });
    expect(inputTitle).toHaveValue(title);
    expect(OxTagButton).toBeInTheDocument();
    expect(KeywordTagButton).not.toBeInTheDocument();
  });

  it('카테고리에 존재하지 않는 Card에 대한 수정을 위해 접근하면 새 카드 등록 페이지가 식별된다.', async () => {
    implementServer([restHandler(mockedGetAuthUserdMecaApi, { status: 400 })]);
    const categoryId = MOCK_CATEGORY_ID;
    const cardId = '01875422-d340-5865-67b1-4acfdc4eea33';
    const mockedContext = {
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
    renderQuery(<WriteCardByCategoryIdPage {...props} />, undefined, undefined, props.dehydratedState);
    const inputTitle = await screen.findByRole('textbox', {
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
