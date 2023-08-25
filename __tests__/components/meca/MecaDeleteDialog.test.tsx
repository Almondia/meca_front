import { renderQuery } from '../../utils';
import { screen, fireEvent } from '@testing-library/react';
import { MOCK_MECAS } from '@/mock/data';
import { restHandler } from '@/mock/handlers';
import { implementServer } from '@/mock/server';
import { mockedDeleteMecaApi, mockedGetUserWithServerApi } from '@/mock/api';

import MecaDeleteDialog from '@/components/meca/organisms/MecaDeleteDialog';

describe('MecaDeleteDialog', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('존재하는 카드 하나를 삭제하면 삭제 성공 toast가 식별된다.', async () => {
    implementServer([restHandler(mockedGetUserWithServerApi), restHandler(mockedDeleteMecaApi)]);
    const { cardId, categoryId } = MOCK_MECAS[0];
    renderQuery(
      <MecaDeleteDialog visible={true} onClose={jest.fn()} cardId={cardId} categoryId={categoryId} cardTitle="title" />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /삭제하기/i,
    });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const toastText = await screen.findByText('삭제 완료');
    expect(toastText).toBeInTheDocument();
  });

  it('카드 삭제에 실패하면 실패 메시지 toast가 식별된다.', async () => {
    implementServer([
      restHandler(mockedGetUserWithServerApi),
      restHandler(mockedDeleteMecaApi, { status: 400, message: '삭제 실패' }),
    ]);
    const { cardId } = MOCK_MECAS[0];
    renderQuery(
      <MecaDeleteDialog visible={true} onClose={jest.fn()} cardId={cardId} categoryId="cid01" cardTitle="title" />,
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
