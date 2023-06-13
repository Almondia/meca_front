import { RecoilObserver, renderQuery } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { PAGINATION_NUM, PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import { hasAuthState } from '@/atoms/common';
import Category, { getServerSideProps } from '@/pages/categories/me/[memberId]';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { implementServer } from '../__mocks__/msw/server';
import { restHandler } from '../__mocks__/msw/handlers';
import { mockedGetAuthUserCategoryListApi, mockedGetUserApi, mockedPostCategoryApi } from '../__mocks__/msw/api';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

beforeEach(() => {
  implementServer([restHandler(mockedGetAuthUserCategoryListApi)]);
});
describe('CategoryListPage', () => {
  it('카테고리 목록 페이지에서 목록 Control UI와 카테고리 목록이 식별된다.', async () => {
    renderQuery(
      <>
        <RecoilObserver node={hasAuthState} defaultValue={true} />
        <Category />
      </>,
    );
    const categoryListPageHead = screen.getByRole('heading', {
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
    renderQuery(
      <>
        <RecoilObserver node={hasAuthState} defaultValue={true} />
        <Category />
      </>,
    );
    const inputTitleText = 'HELL';
    // 추가하기 버튼을 누르면
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
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
    // 새로운 카테고리 카드가 맨 앞에 식별된다.
    const categoryCards = await screen.findAllByRole('article');
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

  it('카테고리 추가 시 비정상적인 입력으로 등록 실패 시 카테고리 추가가 되지 않고 toast가 식별된다.', async () => {
    implementServer([restHandler(mockedPostCategoryApi, { status: 400, message: '제목 오류' })]);
    renderQuery(
      <>
        <RecoilObserver node={hasAuthState} defaultValue={true} />
        <Category />
      </>,
    );
    const inputTitleText = 'geaighalgiahglaghalgah';
    const addButton = screen.getByRole('button', {
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
