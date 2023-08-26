import { renderQuery } from '../../../utils';
import { screen, waitFor } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import nookies from 'nookies';
import OwnedMecaDetailPage, { getServerSideProps } from '@/pages/meca/[cardId]/me';
import { mockedGetAuthUserdMecaApi, mockedGetMecaHistoryByCardApi, mockedGetUserApi } from '@/mock/api';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('OwnedMecaDetailPage', () => {
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
        renderQuery(<OwnedMecaDetailPage {...props} />, undefined, undefined, props.dehydratedState);
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
      expect(props).toHaveProperty('errorMessage', '잘못된 경로 요청');
      expect(props).toHaveProperty('errorStatus', 404);
    });

    it('인증되지 않은 사용자가 요청하면 401 처리된다.', async () => {
      implementServer([restHandler(mockedGetUserApi, { status: 401, message: 'unauthorized' })]);
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
