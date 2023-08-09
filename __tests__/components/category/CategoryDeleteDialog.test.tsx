import { renderQuery } from '@/__tests__/utils';
import { screen, fireEvent } from '@testing-library/react';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import { mockedDeleteCategoryApi } from '@/mock/api';
import { MOCK_CATEGORIES } from '@/mock/data';

import utilApi from '@/apis/utilApi';
import CategoryDeleteDialog from '@/components/category/organisms/CategoryDeleteDialog';

jest.mock('@/apis/utilApi', () => ({
  revalidate: jest.fn(),
}));

describe('CategoryDeleteDialog', () => {
  beforeEach(() => {
    implementServer([restHandler(mockedDeleteCategoryApi)]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('존재하는 공유 카테고리 하나를 삭제하면 삭제 성공 toast가 식별되며 revalidate된다.', async () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
    renderQuery(
      <CategoryDeleteDialog visible={true} onClose={jest.fn()} categoryId={categoryId} categoryTitle={title} shared />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 완료');
    expect(toastText).toBeInTheDocument();
    expect(MOCK_CATEGORIES.some((category) => category.categoryId === categoryId)).toBeFalsy();
    expect(utilApi.revalidate).toHaveBeenCalled();
  });

  it('존재하는 미공유 카테고리 하나를 삭제하면 삭제 성공 toast가 식별되며 revalidate되지 않는다.', async () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
    renderQuery(
      <CategoryDeleteDialog
        visible={true}
        onClose={jest.fn()}
        categoryId={categoryId}
        categoryTitle={title}
        shared={false}
      />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 완료');
    expect(toastText).toBeInTheDocument();
    expect(MOCK_CATEGORIES.some((category) => category.categoryId === categoryId)).toBeFalsy();
    expect(utilApi.revalidate).not.toHaveBeenCalled();
  });

  it('카테고리 삭제에 실패하면 실패 메시지 toast가 식별된다.', async () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 2];
    resetServer([restHandler(mockedDeleteCategoryApi, { status: 400, message: '삭제 실패' })]);
    renderQuery(
      <CategoryDeleteDialog
        visible={true}
        onClose={jest.fn()}
        categoryId={categoryId}
        categoryTitle={title}
        shared={false}
      />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 실패');
    expect(toastText).toBeInTheDocument();
  });
});