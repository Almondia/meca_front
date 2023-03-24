import { getServerSideProps } from '@/pages/me/write/[categoryId]';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { CATEGORIES } from '../__mocks__/msw/data';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('MecaWritePage SSR Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('본인이 가지지 않은 categoryId path에 대해 접근하면 루트 페이지로 redirect 되어야 한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/me/write',
      },
      query: 'hello',
    } as unknown as GetServerSidePropsContext;
    const props = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('redirect');
    expect(props.redirect).toHaveProperty('destination', '/');
  });

  it('본인이 가진 categoryId path에 대해 접근하면 categoryId에 대한 props가 전달된다,', async () => {
    const categoryId = CATEGORIES[0].categoryId;
    console.log(categoryId);
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const mockedContext = {
      req: {
        url: '/me/write',
      },
      res: {},
      query: {
        categoryId,
      },
    } as unknown as GetServerSidePropsContext;
    const { props } = (await getServerSideProps(mockedContext)) as any;
    expect(props).toHaveProperty('categoryId');
  });
});
