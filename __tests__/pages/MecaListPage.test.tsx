import { renderQuery } from '../utils';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { MOCK_CATEGORY_ID, MOCK_MEMBER_ID } from '@/mock/data';
import CategoryById, { getServerSideProps } from '@/pages/categories/[memberCategoryId]';
import { screen, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { combineUUID } from '@/utils/uuidHandler';
import useCategoryLike from '@/hooks/category/useCategoryLike';
import { mockedGetAuthUserMecaListApi, mockedGetSharedMecaListApi, mockedGetUserApi } from '@/mock/api';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

jest.mock('@/hooks/category/useCategoryLike', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MecaListPage', () => {
  const mockedPostLike = jest.fn();
  beforeEach(() => {
    (useCategoryLike as jest.Mock).mockReturnValue({ hasLike: false, likeCount: 5, postLike: mockedPostLike });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('회원 본인의 카드 목록 요청에 대해 카드 목록이 보여진다.', async () => {
    implementServer([restHandler(mockedGetAuthUserMecaListApi), restHandler(mockedGetUserApi)]);
    const combinedUUID = combineUUID(MOCK_MEMBER_ID, MOCK_CATEGORY_ID);
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
    await waitFor(() => renderQuery(<CategoryById {...props} />, undefined, undefined, props.dehydratedState));
    const addButton = screen.getByRole('button', { name: /추가하기/i });
    const dotButtons = screen.getAllByRole('button', { name: /카테고리 수정 삭제 메뉴 열기 버튼/i });
    const noListText = screen.queryByText(/목록이 존재하지 않습니다/i);
    const profileImage = screen.queryByRole('img', { name: /avatar/i });
    const likeButton = screen.getByRole('button', { name: /Like/i });
    expect(addButton).toBeInTheDocument();
    expect(dotButtons[0]).toBeInTheDocument();
    expect(noListText).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
  });

  it('비정상적인 category params로의 접근시 not-found 처리 된다.', async () => {
    implementServer([restHandler(mockedGetUserApi)]);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
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
    implementServer([restHandler(mockedGetSharedMecaListApi, { status: 403, message: '비정상적인 접근' })]);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const combinedUUID = combineUUID(MOCK_MEMBER_ID, MOCK_CATEGORY_ID);
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

  it('본인 것이 아닌 공유 카드 목록 요청일 경우 개인 목록 UI가 식별되지 않는다.', async () => {
    implementServer([restHandler(mockedGetSharedMecaListApi)]);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const combinedUUID = combineUUID(MOCK_MEMBER_ID, MOCK_CATEGORY_ID);
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
    const dotButton = screen.queryByRole('button', { name: /카드 수정 삭제 메뉴 열기 버튼/i });
    const profileImage = screen.queryByRole('img', { name: /임현규-avatar/i });
    expect(addButton).not.toBeInTheDocument();
    expect(dotButton).not.toBeInTheDocument();
    expect(playButton).not.toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
  });
});
