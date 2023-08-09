import { renderQuery } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import Home, { getStaticProps } from '@/pages';
import { MOCK_CATEGORIES } from '@/mock/data';
import { GetStaticPropsContext } from 'next';
import { implementServer } from '@/mock/server';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import { mockedGetSharedCategoryListApi } from '@/mock/api';
import { getPlaiceholder } from 'plaiceholder';

jest.mock('plaiceholder', () => ({
  getPlaiceholder: jest.fn(),
}));

describe('Homepage', () => {
  describe('UI , Event test', () => {
    beforeEach(() => {
      implementServer([restHandler(mockedGetSharedCategoryListApi)]);
    });
    it('메인 UI 상단 Carousel이 보여진다', () => {
      renderQuery(<Home />);
      const text = screen.getByRole('heading', {
        name: /내가 만드는 나를 위한 학습 카드/i,
      });
      expect(text).toBeInTheDocument();
    });

    it('공유 카테고리 목록이 보여진다.', async () => {
      renderQuery(<Home />);
      const categoryCards = await screen.findAllByRole('article');
      const profileImages = await screen.findAllByRole('img', {
        name: /avatar/i,
      });
      expect(categoryCards.length).toEqual(24);
      expect(profileImages.length).toEqual(24);
    });

    it('특정 제목 키워드로 검색 시 해당 카테고리 목록만 보여진다.', async () => {
      const containTitle = 'title1';
      const searchedCategories = MOCK_CATEGORIES.filter((category) => category.title.indexOf(containTitle) !== -1);
      renderQuery(<Home />);
      const searchInput = screen.getByRole('searchbox', {
        name: 'input-category-search',
      });
      expect(searchInput).toHaveValue('');
      fireEvent.change(searchInput, { target: { value: containTitle } });
      expect(searchInput).toHaveValue(containTitle);
      fireEvent.click(screen.getByRole('button', { name: /검색/i }));
      const categoryCards = await screen.findAllByRole('article');
      expect(categoryCards.length).toEqual(searchedCategories.length);
      categoryCards.forEach((card) => expect(card).toHaveTextContent(/title1/i));
    });
  });

  describe('ISR test', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('공유 카테고리 목록이 식별된다.', async () => {
      (getPlaiceholder as jest.Mock).mockImplementationOnce((img) => ({
        base64: img + '-base64',
        img: { src: img },
      }));
      const thumbnail1 = 'http://localhost/images/noimage.png';
      implementServer([
        restOverridedResponseHandler(mockedGetSharedCategoryListApi, {
          contents: [
            {
              categoryInfo: {
                categoryId: '018819c4-e42d-1534-5c24-89c19a260cc9',
                memberId: '018819c4-e42d-1534-5c24-89c19a260cc8',
                thumbnail: thumbnail1,
                title: 'title1',
                createdAt: '2023-05-14T19:18:33.9016305',
                modifiedAt: '2023-05-14T19:18:33.9016305',
                shared: true,
                deleted: false,
              },
              memberInfo: {
                memberId: '018819c4-e42d-1534-5c24-89c19a260cca',
                name: 'name',
                email: 'www@gmail.com',
                profile: null,
                role: 'USER',
                createdAt: '2023-05-14T19:18:33.9016305',
                modifiedAt: '2023-05-14T19:18:33.9016305',
                deleted: false,
                oauthType: 'GOOGLE',
              },
            },
            {
              categoryInfo: {
                categoryId: '018819c4-e42d-1534-5c24-89c19a260cc0',
                memberId: '018819c4-e42d-1534-5c24-89c19a260cc0',
                thumbnail: null,
                title: 'title2',
                createdAt: '2023-05-14T19:18:33.9016305',
                modifiedAt: '2023-05-14T19:18:33.9016305',
                shared: true,
                deleted: false,
              },
              memberInfo: {
                memberId: '018819c4-e42d-1534-5c24-89c19a260cc0',
                name: 'name',
                email: 'www@gmail.com',
                profile: null,
                role: 'USER',
                createdAt: '2023-05-14T19:18:33.9016305',
                modifiedAt: '2023-05-14T19:18:33.9016305',
                deleted: false,
                oauthType: 'GOOGLE',
              },
            },
          ],
          hasNext: null,
          pageSize: 2,
          sortOrder: 'DESC',
        }),
      ]);
      const context = {} as unknown as GetStaticPropsContext;
      const { props, revalidate } = (await getStaticProps(context)) as any;
      expect(revalidate).toEqual(3600);
      expect(props).toHaveProperty('dehydratedState');
      expect(getPlaiceholder).toHaveBeenCalledTimes(1);
      renderQuery(<Home />, undefined, undefined, props.dehydratedState);
      const cardImage = screen.getByRole('img', { name: /title1-category-thumbnail/i });
      const categoryCards = screen.getAllByRole('article');
      expect(cardImage).toBeInTheDocument();
      expect(categoryCards.length).toEqual(2);
    });

    it('카테고리 목록 api 호출 실패 시 빈 목록 UI가 식별된다.', async () => {
      implementServer([restHandler(mockedGetSharedCategoryListApi, { status: 500, message: '서버오류' })]);
      const context = {} as unknown as GetStaticPropsContext;
      const { props, revalidate } = (await getStaticProps(context)) as any;
      expect(revalidate).toEqual(60);
      expect(props).toHaveProperty('dehydratedState');
      renderQuery(<Home />, undefined, undefined, props.dehydratedState);
      const carouselText = screen.queryByRole('heading', {
        name: /내가 만드는 나를 위한 학습 카드/i,
      });
      const emptyListText = await screen.findByText(/목록이 존재하지 않습니다/i);
      expect(carouselText).toBeInTheDocument();
      expect(emptyListText).toBeInTheDocument();
    });
  });
});
