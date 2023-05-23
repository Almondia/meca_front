import MecaControl, { MecaControlProps } from '@/components/organisms/MecaControl';
import { renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import mockRouter from 'next-router-mock';

describe('MecaControl', () => {
  const props: MecaControlProps = {
    categoryId: 'cid01',
    categoryTitle: 'title',
    isMine: true,
    name: 'myName',
    profile: '',
    hasAuth: true,
  };

  it('본인 MecaControl UI가 식별된다.', () => {
    renderQuery(<MecaControl {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    const addButton = screen.getByRole('button', { name: /추가하기 /i });
    const name = screen.getByText('myName');
    expect(playButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('본인 MecaControl에서 추가하기 버튼을 클릭하면 해당 페이지로 이동한다.', () => {
    renderQuery(<MecaControl {...props} isMine />);
    const addButton = screen.getByRole('button', { name: /추가하기 /i });
    fireEvent.click(addButton);
    expect(mockRouter.pathname).toEqual(`/mecas/write/${props.categoryId}`);
  });

  it('다른사람의 MecaControl UI가 식별된다.', () => {
    renderQuery(<MecaControl {...props} isMine={false} />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    const addButton = screen.queryByRole('button', { name: /추가하기 /i });
    const name = screen.getByText('myName');
    expect(playButton).toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('카드 목록이 존재할 때 플레이를 누르면 QuizStartDialog가 식별된다.', async () => {
    const count = 15;
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            count,
          }),
        );
      }),
    );
    renderQuery(<MecaControl {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    fireEvent.click(playButton);
    const modalQuizCountText = await screen.findByText(`문제 수 (최대 ${count})`);
    expect(modalQuizCountText).toBeInTheDocument();
  });

  it('카드 목록이 존재하지 않을 때 플레이를 누르면 toast가 식별된다.', async () => {
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            count: 0,
          }),
        );
      }),
    );
    renderQuery(<MecaControl {...props} isMine />);
    const playButton = screen.getByRole('button', { name: /플레이/i });
    fireEvent.click(playButton);
    const toastText = await screen.findByText('플레이할 카드가 없어요!');
    expect(toastText).toBeInTheDocument();
  });

  it('인증상태가 아닌 경우 플레이 버튼이 식별되지 않는다.', () => {
    renderQuery(<MecaControl {...props} hasAuth={false} />);
    const addButton = screen.queryByRole('button', { name: /추가하기 /i });
    const playButton = screen.queryByRole('button', { name: /플레이/i });
    expect(addButton).toBeInTheDocument();
    expect(playButton).not.toBeInTheDocument();
  });
});
