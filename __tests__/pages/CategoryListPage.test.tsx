import { renderQuery } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { PAGINATION_NUM, PRIVATE_SSR_CDN_CACHE_VALUE } from '@/utils/constants';
import Category, { getServerSideProps } from '@/pages/categories/me/[memberId]';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { implementServer } from '../__mocks__/msw/server';
import { restHandler, restOverridedResponseHandler } from '../__mocks__/msw/handlers';
import {
  mockedGetAuthUserCategoryListApi,
  mockedGetUserApi,
  mockedGetUserWithServerApi,
  mockedPostCategoryApi,
} from '../__mocks__/msw/api';
import { MOCK_CATEGORIES } from '../__mocks__/msw/data';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('CategoryListPage', () => {
  beforeEach(() => {
    implementServer([restHandler(mockedGetAuthUserCategoryListApi), restHandler(mockedGetUserWithServerApi)]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('개인 카테고리 목록 페이지 UI가 식별된다.', async () => {
    renderQuery(<Category />);
    const categoryListPageHead = await screen.findByRole('heading', {
      name: /내 카테고리/i,
    });
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    expect(categoryListPageHead).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    const categoryCards = await screen.findAllByRole('article');
    expect(categoryCards).toHaveLength(PAGINATION_NUM);
  });

  it('검색어를 입력해 검색하면 개인 카테고리 목록이 필터링되어 식별된다.', async () => {
    renderQuery(<Category />);
    const searchInput = await screen.findByRole('searchbox', { name: 'input-category-search' });
    const searchButton = screen.getByRole('button', { name: '검색' });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'title3' } });
    fireEvent.click(searchButton);
    const filteredCategoriesLength = MOCK_CATEGORIES.filter((v) => v.title.indexOf('title3') !== -1).length;
    const categoryCards = await screen.findAllByRole('article');
    expect(categoryCards).toHaveLength(filteredCategoriesLength);
    fireEvent.change(searchInput, { target: { value: 'geagiheagliahgilae' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('(작성,추천) 목록 선택 버튼 클릭 시 UI가 전환되어 식별된다.', async () => {
    implementServer([
      restOverridedResponseHandler(mockedGetAuthUserCategoryListApi, {
        contents: [],
        hasNext: null,
        pageSize: 0,
        sortOrder: 'ASC',
      }),
    ]);
    renderQuery(<Category />);
    const listPageHead = await screen.findByRole('heading', {
      name: /내 카테고리/i,
    });
    expect(listPageHead).toBeInTheDocument();
    const toMyCategoryButton = screen.getByRole('button', { name: /작성 목록/i });
    const toRecommendedCategoryButton = screen.getByRole('button', { name: /추천 목록/i });
    expect(toMyCategoryButton).toHaveStyleRule('background-color', 'var(--color-brand)');
    expect(toRecommendedCategoryButton).toBeInTheDocument();
    // 내 카테고리 => 추천한 카테고리
    fireEvent.click(toRecommendedCategoryButton);
    expect(listPageHead).toHaveAccessibleName(/추천한 카테고리/i);
    expect(toRecommendedCategoryButton).toHaveStyleRule('background-color', 'var(--color-brand)');
    const searchInput = screen.getByRole('searchbox', { name: 'input-category-search' });
    fireEvent.change(searchInput, { target: { value: 'input with recommended' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    // 추천한 카테고리 => 내 카테고리
    fireEvent.click(toMyCategoryButton);
    expect(listPageHead).toHaveAccessibleName(/내 카테고리/i);
    expect(searchInput).toHaveValue('');
    // 내 카테고리 => 추천한 카테고리
    fireEvent.click(toRecommendedCategoryButton);
    expect(searchInput).toHaveValue('input with recommended');
  });

  it('카테고리 하나를 정상적으로 추가하면 카테고리 목록에 새로운 데이터가 추가된다.', async () => {
    implementServer([restHandler(mockedPostCategoryApi)]);
    renderQuery(<Category />);
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
    renderQuery(<Category />);
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

    it('본인이 추천한 category 목록이 식별된다.', async () => {
      implementServer([
        restOverridedResponseHandler(mockedGetAuthUserCategoryListApi, {
          contents: [
            {
              category: {
                categoryId: '01894a21-0fce-6d50-6259-a603e4f1fcf1',
                memberId: '01894a21-0fce-6d50-6259-a603e4f1fcf0',
                thumbnail: null,
                title: 'title',
                createdAt: '2023-07-12T21:43:48.0463673',
                modifiedAt: '2023-07-12T21:43:48.0463673',
                shared: true,
                deleted: false,
              },
              statistics: {
                scoreAvg: 12.3,
                solveCount: 10,
                totalCount: 20,
              },
              member: {
                memberId: '01894a21-0fce-6d50-6259-a603e4f1fcf0',
                name: 'member-name',
                email: 'www@gmail.com',
                profile: 'https://aws.s3.com',
                oauthType: 'GOOGLE',
                role: 'USER',
                createdAt: '2023-07-12T21:43:48.0463673',
                modifiedAt: '2023-07-12T21:43:48.0463673',
                deleted: false,
              },
              likeCount: 10,
            },
          ],
          hasNext: null,
          pageSize: 1,
          sortOrder: 'DESC',
        }),
      ]);
      const mockedSetHeader = jest.fn();
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        query: { recommended: 'true' },
        res: {
          setHeader: mockedSetHeader,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('isRecommendedRequest', true);
      await waitFor(() => renderQuery(<Category {...props} />, undefined, undefined, props.dehydratedState));
      const categoryListPageHead = screen.getByRole('heading', { name: /추천한 카테고리/i });
      const cardUserAvatar = screen.getByRole('img', { name: 'member-name-avatar' });
      expect(categoryListPageHead).toBeInTheDocument();
      expect(cardUserAvatar).toBeInTheDocument();
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
      const emptyListText = await screen.findByText('목록이 존재하지 않습니다');
      expect(emptyListText).toBeInTheDocument();
    });
  });
});
