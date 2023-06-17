import { renderQuery } from '../utils';
import { screen, waitFor } from '@testing-library/react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { combineUUID } from '@/utils/uuidHandler';
import { implementServer, resetServer } from '../__mocks__/msw/server';
import { restHandler } from '../__mocks__/msw/handlers';
import nookies from 'nookies';
import * as SharedCardPage from '@/pages/mecas/[memberCardId]';
import * as PrivateCardPage from '@/pages/mecas/me/[cardId]';
import {
  mockedGetAuthUserdMecaApi,
  mockedGetMecaHistoryByCardApi,
  mockedGetSharedMecaApi,
  mockedGetUserApi,
} from '../__mocks__/msw/api';
jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaById', () => {
  describe('shared Page test', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const { default: MecaById, getStaticProps } = SharedCardPage;
    /**
     *  "title": "Small Soft Computer",
        "memberId": "0187934c-bd9d-eb51-758f-3b3723a0d3a7",
        "cardId": "0187934d-1046-4527-9fca-e9072ee8f9fe",
        "name": "임현규",
        "question": "February",
        "categoryId": "0187934c-d471-9365-fe25-9fa63e4ba45c",
        "cardType": "OX_QUIZ",
  */
    it('존재하는 공유된 단일 카드 페이지가 식별된다.', async () => {
      implementServer([restHandler(mockedGetSharedMecaApi), restHandler(mockedGetMecaHistoryByCardApi)]);
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: '',
      });
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
      await waitFor(() => {
        renderQuery(<MecaById {...props} />, undefined, undefined, props.dehydratedState);
      });
      const cardTitle = screen.getByRole('heading', { name: 'Small Soft Computer' });
      const updateLink = screen.queryByRole('link', { name: '수정하기' });
      expect(cardTitle).toBeInTheDocument();
      expect(updateLink).not.toBeInTheDocument();
    });

    it('접근 권한이 없는(비공개인) 공개 카드 요청 시 404 처리된다.', async () => {
      implementServer([restHandler(mockedGetSharedMecaApi, { status: 403, message: '접근 권한 없음' })]);
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: '',
      });
      const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      const mockedContext = {
        params: {
          memberCardId: combineUUID(memberId, cardId),
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '접근 권한 없음');
    });

    it.each([['a-b-c-d-e'], [''], ['[abc]'], [undefined]])(
      '잘못된 param 요청에 대해서 404 처리된다.',
      async (memberCardId?: string) => {
        const mockedContext = {
          params: {
            memberCardId,
          },
        } as unknown as GetStaticPropsContext;
        const { props } = (await getStaticProps(mockedContext)) as any;
        expect(props).toHaveProperty('errorMessage', '잘못된 요청');
      },
    );
  });

  describe('private Page test', () => {
    beforeEach(() => {
      implementServer([
        restHandler(mockedGetUserApi),
        restHandler(mockedGetAuthUserdMecaApi),
        restHandler(mockedGetMecaHistoryByCardApi),
      ]);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    const { default: MecaById, getServerSideProps } = PrivateCardPage;
    it('개인 단일 카드 페이지가 식별된다.', async () => {
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedSetHeader = jest.fn();
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      const mockedContext = {
        params: {
          cardId,
        },
        res: {
          setHeader: mockedSetHeader,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('cardId', cardId);
      expect(props).toHaveProperty('dehydratedState');
      await waitFor(() => {
        renderQuery(<MecaById {...props} />, undefined, undefined, props.dehydratedState);
      });
      const cardTitle = screen.getByRole('heading', { name: 'Small Soft Computer' });
      const username = screen.getByText('임현규');
      const updateLinkButton = screen.getByRole('button', { name: '수정하기' });
      const deleteLinkButton = screen.getByRole('button', { name: '삭제하기' });
      expect(cardTitle).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(updateLinkButton).toBeInTheDocument();
      expect(deleteLinkButton).toBeInTheDocument();
    });

    it('잘못된 param 요청에 대해서 404 처리된다.', async () => {
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        params: {
          cardId: '',
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '잘못된 요청');
      expect(props).toHaveProperty('errorStatus', 404);
    });

    it('인증되지 않은 사용자가 요청하면 401 처리된다.', async () => {
      resetServer([restHandler(mockedGetUserApi, { status: 401, message: 'unauthorized' })]);
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        params: {
          cardId,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', 'unauthorized');
      expect(props).toHaveProperty('errorStatus', 401);
    });

    it('존재하지 않는 본인 카드 요청에 대해 404 처리된다.', async () => {
      implementServer([restHandler(mockedGetAuthUserdMecaApi, { status: 400, message: '해당 자원을 찾을 수 없음' })]);
      const cardId = '0187934c-d471-9365-fe25-9fa63e4ba45c';
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: 'token',
      });
      const mockedContext = {
        params: {
          cardId,
        },
      } as unknown as GetServerSidePropsContext;
      const { props } = (await getServerSideProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '해당 자원을 찾을 수 없음');
      expect(props).toHaveProperty('errorStatus', 404);
    });
  });
});
