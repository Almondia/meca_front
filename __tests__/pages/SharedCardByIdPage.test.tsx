import { renderQuery } from '../utils';
import { screen } from '@testing-library/react';
import MecaById, { getStaticProps } from '@/pages/mecas/[memberCardId]';
import { GetStaticPropsContext } from 'next';
import { combineUUID } from '@/utils/uuidHandler';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MecaById Page', () => {
  /**
     *  "title": "Small Soft Computer",
        "memberId": "0187934c-bd9d-eb51-758f-3b3723a0d3a7",
        "cardId": "0187934d-1046-4527-9fca-e9072ee8f9fe",
        "name": "임현규",
        "question": "February",
        "categoryId": "0187934c-d471-9365-fe25-9fa63e4ba45c",
        "cardType": "OX_QUIZ",
  */
  it('공유된 단일 카드 페이지가 식별된다.', async () => {
    renderQuery(<MecaById cardId="0187934d-1046-4527-9fca-e9072ee8f9fe" />);
    const cardTitle = await screen.findByRole('heading', { name: /Small Soft Computer/i });
    const username = await screen.findByText('임현규');
    expect(cardTitle).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });

  describe('SSG Test', () => {
    it('존재하는 공유 카드 요청에 대해 단일 카드 페이지가 정상적으로 즉시 식별된다.', async () => {
      const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      const mockedContext = {
        params: {
          memberCardId: combineUUID(memberId, cardId),
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('cardId', cardId);
      expect(props).toHaveProperty('dehydratedState');
      renderQuery(<MecaById cardId={cardId} />, undefined, undefined, props.dehydratedState);
      // 기다림 없이 즉시 보여져야 한다.
      const cardTitle = screen.getByRole('heading', { name: /Small Soft Computer/i });
      expect(cardTitle).toBeInTheDocument();
    });

    it('잘못된 param 요청에 대해서 404 처리된다.', async () => {
      const mockedContext = {
        params: {
          memberCardId: 'a-b-c-d-e',
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '잘못된 요청');
    });

    it('접근 권한이 없는(비공개인) 카드 요청 시 404 처리된다.', async () => {
      const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      server.resetHandlers(
        rest.get(`${ENDPOINT}/cards/:cardId/share`, (req, res, ctx) => {
          return res(ctx.status(403), ctx.json({ message: '접근 권한 없음', status: 403 }));
        }),
      );
      const mockedContext = {
        params: {
          memberCardId: combineUUID(memberId, cardId),
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '접근 권한 없음');
    });
  });
});
