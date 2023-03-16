import { renderQuery } from '../utils';
import { screen, fireEvent, findByText } from '@testing-library/react';
import CategoryDeleteDialog from '@/components/molcules/CategoryDeleteDialog';
import CATEGORIES from '../__mocks__/msw/data';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { rest } from 'msw';
import { server } from '../__mocks__/msw/server';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CategoryDeleteDialog', () => {
  it('존재하는 카테고리 하나를 삭제하면 삭제 성공 toast가 식별된다.', async () => {
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
    renderQuery(
      <CategoryDeleteDialog visible={true} onClose={jest.fn()} categoryId={categoryId} categoryTitle={title} />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 완료');
    expect(toastText).toBeInTheDocument();
    expect(CATEGORIES.some((category) => category.categoryId === categoryId)).toBeFalsy();
  });

  it('카테고리 삭제에 실패하면 실패 메시지 toast가 식별된다.', async () => {
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
    server.resetHandlers(
      rest.delete(`${ENDPOINT}/categories/${categoryId}`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: '삭제 실패',
          }),
        );
      }),
    );
    renderQuery(
      <CategoryDeleteDialog visible={true} onClose={jest.fn()} categoryId={categoryId} categoryTitle={title} />,
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
