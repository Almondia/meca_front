import { renderQuery } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import MyCategory from '@/pages/categories/me';
import { PAGINATION_NUM } from '@/utils/constants';
import { generateQueryClient } from '@/query/queryClient';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MyCategoryList Page', () => {
  it('카테고리 목록 페이지에서 목록 Control UI와 카테고리 목록이 식별된다.', async () => {
    renderQuery(<MyCategory />);
    const categoryListPageHead = screen.getByRole('heading', {
      name: '카테고리 목록',
    });
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    expect(categoryListPageHead).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    const categoryCards = await screen.findAllByTestId('id-category-card');
    expect(categoryCards).toHaveLength(PAGINATION_NUM);
  });

  it('카테고리를 키워드로 검색하면 해당 키워드가 포함된 목록만 식별된다.', async () => {
    renderQuery(<MyCategory />, null, generateQueryClient());
    const categorySearchInput = screen.getByRole('textbox', {
      name: 'input-category-search',
    });
    expect(categorySearchInput).toBeInTheDocument();

    // 검색어 입력
    fireEvent.change(categorySearchInput, { target: { value: 'title1' } });
    expect(categorySearchInput).toHaveValue('title1');

    // 검색
    const categorySearchButton = screen.getByRole('button', {
      name: '검색',
    });
    expect(categorySearchButton).toBeInTheDocument();
    fireEvent.click(categorySearchButton);
    const categoryCards = await screen.findAllByTestId('id-category-card');
    categoryCards.forEach((card) => {
      expect(card).toHaveTextContent(/title1/i);
    });
  });

  it('카테고리 하나를 정상적으로 추가하면 카테고리 목록에 새로운 데이터가 추가된다.', async () => {
    renderQuery(
      <>
        <div id="modal-root"></div>
        <MyCategory />
      </>,
      null,
      generateQueryClient(),
    );
    const inputTitleText = 'HELL';
    // 추가하기 버튼을 누르면
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    fireEvent.click(addButton);
    // 다이얼로그의 input이 등장한다.
    const categoryTitleInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(categoryTitleInput).toBeInTheDocument();
    fireEvent.change(categoryTitleInput, { target: { value: inputTitleText } });
    expect(categoryTitleInput).toHaveValue(inputTitleText);
    // 새 카테고리를 등록한다.
    const submitButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(submitButton);
    // 새로운 카테고리 카드가 맨 앞에 식별된다.
    const categoryCards = await screen.findAllByTestId('id-category-card');
    expect(categoryCards).toHaveLength(PAGINATION_NUM);
    expect(categoryCards[0]).toHaveTextContent(inputTitleText);
    expect(
      screen.queryByRole('button', {
        name: /등록하기/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('카테고리 추가 시 비정상적인 title을 입력하면 카테고리 추가가 되지 않고 toast가 식별된다.', async () => {
    renderQuery(
      <>
        <div id="modal-root"></div>
        <MyCategory />
      </>,
      null,
      generateQueryClient(),
    );
    // should not over 20
    const inputTitleText = 'geaighalgiahglaghalgahglaghalghalghalghaglhalgahglaghalghalghag';
    const addButton = screen.getByRole('button', {
      name: /추가하기/i,
    });
    fireEvent.click(addButton);
    const categoryTitleInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(categoryTitleInput).toBeInTheDocument();
    fireEvent.change(categoryTitleInput, { target: { value: inputTitleText } });
    expect(categoryTitleInput).toHaveValue(inputTitleText);
    const submitButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(submitButton);
    const toastText = await screen.findByText('제목 오류');
  });
});
