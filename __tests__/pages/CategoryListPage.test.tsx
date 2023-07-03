import { renderQuery } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { PAGINATION_NUM, PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import Category, { getServerSideProps } from '@/pages/categories/me/[memberId]';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { implementServer } from '../__mocks__/msw/server';
import { restHandler } from '../__mocks__/msw/handlers';
import {
  mockedGetAuthUserCategoryListApi,
  mockedGetUserApi,
  mockedGetUserWithServerApi,
  mockedPostCategoryApi,
} from '../__mocks__/msw/api';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

beforeEach(() => {
  implementServer([restHandler(mockedGetAuthUserCategoryListApi), restHandler(mockedGetUserWithServerApi)]);
});
describe('CategoryListPage', () => {
  it('카테고리 목록 페이지에서 목록 Control UI와 카테고리 목록이 식별된다.', async () => {
    await waitFor(() => renderQuery(<Category />));
    const categoryListPageHead = await screen.findByRole('heading', {
      name: /카테고리 목록/i,
    });
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    expect(categoryListPageHead).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    const categoryCards = await screen.findAllByRole('article');
    expect(categoryCards).toHaveLength(PAGINATION_NUM);
  });

  it('카테고리 하나를 정상적으로 추가하면 카테고리 목록에 새로운 데이터가 추가된다.', async () => {
    implementServer([restHandler(mockedPostCategoryApi)]);
    await waitFor(() => renderQuery(<Category />));
    const inputTitleText = 'HELL';
    // 추가하기 버튼을 누르면
    const addButton = await screen.findByRole('button', {
      name: /추가하기/i,
    });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    // 다이얼로그의 input이 등장한다.
    const categoryTitleInput = await screen.findByRole('textbox', {
      name: 'input-category-title',
    });
    expect(categoryTitleInput).toBeInTheDocument();
    fireEvent.change(categoryTitleInput, { target: { value: inputTitleText } });
    expect(categoryTitleInput).toHaveValue(inputTitleText);
    // 새 카테고리를 등록한다.
    const submitButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toBeInTheDocument());
    const categoryCards = screen.getAllByRole('article');
    expect(categoryCards).toHaveLength(PAGINATION_NUM);
    expect(categoryCards[0]).toHaveTextContent(inputTitleText);
    await waitFor(() =>
      expect(
        screen.queryByRole('button', {
          name: /등록하기/i,
        }),
      ).not.toBeInTheDocument(),
    );
  });

  it('카테고리 추가 실패 시 카테고리 추가가 되지 않고 toast가 식별된다.', async () => {
    implementServer([restHandler(mockedPostCategoryApi, { status: 400, message: '제목 오류' })]);
    await waitFor(() => renderQuery(<Category />));
    const inputTitleText = 'geaighalgiahglaghalgah';
    const addButton = await screen.findByRole('button', {
      name: /추가하기/i,
    });
    fireEvent.click(addButton);
    const categoryTitleInput = await screen.findByRole('textbox', {
      name: 'input-category-title',
    });
    expect(categoryTitleInput).toBeInTheDocument();
    fireEvent.change(categoryTitleInput, { target: { value: inputTitleText } });
    expect(categoryTitleInput).toHaveValue(inputTitleText);
    const submitButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(submitButton);
    const toastText = await screen.findByText('제목 오류');
    expect(toastText).toBeInTheDocument();
  });

  describe('SSR Test', () => {
    beforeEach(() => {
      implementServer([restHandler(mockedGetUserApi), restHandler(mockedGetAuthUserCategoryListApi)]);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('인증된 회원 본인의 category 목록 path에 접근하면 정상적으로 동작한다.', async () => {
      const mockedSetHeader = jest.fn();
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        res: {
          setHeader: mockedSetHeader,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('dehydratedState');
      expect(mockedSetHeader).toHaveBeenCalledWith('Cache-Control', PRIVATE_SSR_CDN_CACHE_VALUE);
    });

    it('회원 category 목록 조회에 실패하면 빈 목록이 식별된다.', async () => {
      implementServer([restHandler(mockedGetAuthUserCategoryListApi, { status: 400 })]);
      const mockedSetHeader = jest.fn();
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        res: {
          setHeader: mockedSetHeader,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('dehydratedState');
      expect(mockedSetHeader).not.toHaveBeenCalled();
      renderQuery(<Category />, undefined, undefined, props.dehydratedState);
      const emptyListText = screen.getByText('목록이 존재하지 않습니다');
      expect(emptyListText).toBeInTheDocument();
    });
  });
});
