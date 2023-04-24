import { renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import { MECAS } from '../__mocks__/msw/data';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { rest } from 'msw';
import { server } from '../__mocks__/msw/server';
import MecaDeleteDialog from '@/components/molcules/MecaDeleteDialog';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MecaDeleteDialog', () => {
  it('존재하는 카드 하나를 삭제하면 삭제 성공 toast가 식별된다.', async () => {
    const { cardId } = MECAS[0];
    renderQuery(<MecaDeleteDialog visible={true} onClose={jest.fn()} cardId={cardId} cardTitle="title" />);
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 완료');
    expect(toastText).toBeInTheDocument();
  });

  it('카테고리 삭제에 실패하면 실패 메시지 toast가 식별된다.', async () => {
    const { cardId } = MECAS[0];
    server.resetHandlers(
      rest.delete(`${ENDPOINT}/cards/${cardId}`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: '삭제 실패',
          }),
        );
      }),
    );
    renderQuery(<MecaDeleteDialog visible={true} onClose={jest.fn()} cardId={cardId} cardTitle="title" />);
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 실패');
    expect(toastText).toBeInTheDocument();
  });
});
