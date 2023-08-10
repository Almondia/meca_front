import { renderQuery } from '../../utils';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedGetMecaCountApi } from '@/mock/api';
import { screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import MecaListHeader from '@/components/meca/organisms/MecaListHeader';

describe('MecaListHeader', () => {
  const props = {
    categoryId: 'cid01',
    categoryTitle: 'title',
    isMine: true,
    name: 'myName',
    profile: '',
    hasAuth: true,
  };

  it('본인 MecaListHeader UI가 식별된다.', () => {
    renderQuery(<MecaListHeader {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    const addButton = screen.getByRole('button', { name: /추가하기 /i });
    const name = screen.getByText('myName');
    expect(playButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('본인 MecaListHeader 추가하기 버튼을 클릭하면 해당 페이지로 이동한다.', () => {
    renderQuery(<MecaListHeader {...props} isMine />);
    const addButton = screen.getByRole('button', { name: /추가하기 /i });
    fireEvent.click(addButton);
    expect(mockRouter.pathname).toEqual(`/mecas/write/${props.categoryId}`);
  });

  it('다른사람의 MecaListHeader UI가 식별된다.', () => {
    renderQuery(<MecaListHeader {...props} isMine={false} />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    const addButton = screen.queryByRole('button', { name: /추가하기 /i });
    const name = screen.getByText('myName');
    expect(playButton).toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('카드 목록이 존재할 때 플레이를 누르면 QuizStartDialog가 식별된다.', async () => {
    const count = 15;
    implementServer([restHandler(() => mockedGetMecaCountApi(count))]);
    renderQuery(<MecaListHeader {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    fireEvent.click(playButton);
    const modalQuizCountText = await screen.findByText(`문제 수 (최대 ${count})`);
    expect(modalQuizCountText).toBeInTheDocument();
  });

  it('카드 목록이 존재하지 않을 때 플레이를 누르면 toast가 식별된다.', async () => {
    implementServer([restHandler(() => mockedGetMecaCountApi(0))]);
    renderQuery(<MecaListHeader {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    fireEvent.click(playButton);
    const toastText = await screen.findByText('플레이할 카드가 없어요!');
    expect(toastText).toBeInTheDocument();
  });

  it('인증상태가 아닌 경우 플레이 버튼이 식별되지 않는다.', () => {
    renderQuery(<MecaListHeader {...props} hasAuth={false} />);
    const addButton = screen.queryByRole('button', { name: /추가하기 /i });
    const playButton = screen.queryByRole('button', { name: /플레이/i });
    expect(addButton).toBeInTheDocument();
    expect(playButton).not.toBeInTheDocument();
  });
});
