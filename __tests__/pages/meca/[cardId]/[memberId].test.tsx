import { renderQuery } from '../../../utils';
import { screen, waitFor } from '@testing-library/react';
import { GetStaticPropsContext } from 'next';
import { combineUUID } from '@/utils/uuidHandler';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import nookies from 'nookies';
import MecaDetailByMemberIdPage, { getStaticProps } from '@/pages/meca/[cardId]/[memberId]';
import { mockedGetMecaHistoryByCardApi, mockedGetSharedMecaApi } from '@/mock/api';
jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaDetailByMemberIdPage', () => {
  describe('shared Page test', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('존재하는 공유된 단일 카드 페이지가 식별된다.', async () => {
      implementServer([restHandler(mockedGetSharedMecaApi), restHandler(mockedGetMecaHistoryByCardApi)]);
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: '',
      });
      const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      const mockedContext = {
        params: {
          memberId,
          cardId,
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('cardId', cardId);
      expect(props).toHaveProperty('dehydratedState');
      expect(props).toHaveProperty('questionText');
      expect(props).toHaveProperty('thumbnailUrl');
      await waitFor(() => {
        renderQuery(<MecaDetailByMemberIdPage {...props} />, undefined, undefined, props.dehydratedState);
      });
      const cardTitle = screen.getByRole('heading', { name: 'Small Soft Computer' });
      const updateLink = screen.queryByRole('button', { name: '수정하기' });
      const toCategoryLink = screen.getByRole('button', { name: /카테고리 보기/i });
      expect(cardTitle).toBeInTheDocument();
      expect(updateLink).not.toBeInTheDocument();
      expect(toCategoryLink).toBeInTheDocument();
    });

    it('접근 권한이 없는(비공개인) 공개 카드 요청 시 404 페이지가 보여진다.', async () => {
      implementServer([restHandler(mockedGetSharedMecaApi, { status: 403, message: '접근 권한 없음' })]);
      (nookies.get as jest.Mock).mockReturnValue({
        accessToken: '',
      });
      const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
      const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
      const mockedContext = {
        params: {
          memberId,
          cardId,
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('cardId', cardId);
      expect(props).toHaveProperty('memberId', memberId);
      renderQuery(<MecaDetailByMemberIdPage {...props} />, undefined, undefined, props.dehydratedState);
      expect(screen.getByRole('heading', { name: /404 Not Found/i })).toBeInTheDocument();
    });

    it('잘못된 param 요청에 대해서 404 처리된다.', async () => {
      const mockedContext = {
        params: {
          memberId: undefined,
          cardId: 'hello',
        },
      } as unknown as GetStaticPropsContext;
      const { props } = (await getStaticProps(mockedContext)) as any;
      expect(props).toHaveProperty('errorMessage', '잘못된 경로 요청');
    });
  });
});
