import { renderQuery } from '../utils';
import { act, screen, fireEvent, waitFor } from '@testing-library/react';
import MecaById, { getServerSideProps, MecaByIdProps } from '@/pages/mecas/[memberCardId]';
import { GetServerSidePropsContext } from 'next';
import { combineUUID } from '@/utils/uuidHandler';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import nookies from 'nookies';
import { PRIVATE_CACHE, PUBLIC_CACHE } from '@/utils/constants';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaById Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
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
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: '',
    });
    const mockedSetHeader = jest.fn();
    const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
    const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
    const mockedContext = {
      params: {
        memberCardId: combineUUID(memberId, cardId),
      },
      res: {
        setHeader: mockedSetHeader,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('cardId', cardId);
    expect(props).toHaveProperty('name', '임현규');
    expect(props).toHaveProperty('isShared', true);
    expect(props).toHaveProperty('dehydratedState');
    expect(mockedSetHeader).toHaveBeenCalledWith('Cache-Control', PUBLIC_CACHE);
    await waitFor(() => {
      renderQuery(<MecaById {...props} />, undefined, undefined, props.dehydratedState);
    });
    const cardTitle = screen.getByRole('heading', { name: 'Small Soft Computer' });
    const updateLink = screen.queryByRole('link', { name: '수정하기' });
    expect(cardTitle).toBeInTheDocument();
    expect(updateLink).not.toBeInTheDocument();
  });

  it('개인 단일 카드 페이지가 식별된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    server.use(
      rest.get(`${ENDPOINT}/members/me`, (req, res, ctx) => {
        return res(
          ctx.json({
            memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
            name: '임현규',
            email: 'abc@abc.com',
            role: 'USER',
            oauthType: 'KAKAO',
            createdAt: '2023-03-11T12:56:22.954816',
          }),
        );
      }),
    );
    const mockedSetHeader = jest.fn();
    const memberId = '0187934c-bd9d-eb51-758f-3b3723a0d3a7';
    const cardId = '0187934d-1046-4527-9fca-e9072ee8f9fe';
    const mockedContext = {
      params: {
        memberCardId: combineUUID(memberId, cardId),
      },
      res: {
        setHeader: mockedSetHeader,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('cardId', cardId);
    expect(props).toHaveProperty('cardId', cardId);
    expect(props).toHaveProperty('isShared', false);
    expect(props).toHaveProperty('dehydratedState');
    expect(mockedSetHeader).toHaveBeenCalledWith('Cache-Control', PRIVATE_CACHE);
    await waitFor(() => {
      renderQuery(<MecaById {...props} />, undefined, undefined, props.dehydratedState);
    });
    const cardTitle = screen.getByRole('heading', { name: 'Small Soft Computer' });
    const username = screen.getByText('임현규');
    const updateLink = screen.getByRole('link', { name: '수정하기' });
    const deleteLink = screen.getByRole('link', { name: '삭제하기' });
    expect(cardTitle).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(updateLink).toBeInTheDocument();
    expect(deleteLink).toBeInTheDocument();
  });

  it('잘못된 param 요청에 대해서 404 처리된다.', async () => {
    const mockedContext = {
      params: {
        memberCardId: 'a-b-c-d-e',
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '잘못된 요청');
  });

  it('접근 권한이 없는(비공개인) 공개 카드 요청 시 404 처리된다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: '',
    });
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
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '접근 권한 없음');
  });

  it('존재하지 않는 본인 카드 요청에 대해 404 처리된다.', async () => {
    const cardId = '0187934c-d471-9365-fe25-9fa63e4ba45c';
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    server.use(
      rest.get(`${ENDPOINT}/members/me`, (req, res, ctx) => {
        return res(
          ctx.json({
            memberId: '0187934c-bd9d-eb51-758f-3b3723a0d3a7',
            name: '임현규',
            email: 'abc@abc.com',
            role: 'USER',
            oauthType: 'KAKAO',
            createdAt: '2023-03-11T12:56:22.954816',
          }),
        );
      }),
      rest.get(`${ENDPOINT}/cards/:cardId/me`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: '해당 자원을 찾을 수 없음', status: 400 }));
      }),
    );
    const mockedContext = {
      params: {
        memberCardId: combineUUID('0187934c-bd9d-eb51-758f-3b3723a0d3a7', cardId),
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('errorMessage', '해당 자원을 찾을 수 없음');
  });
});
