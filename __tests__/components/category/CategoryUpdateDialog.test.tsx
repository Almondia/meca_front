import { renderQuery } from '../../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MOCK_CATEGORIES } from '@/mock/data';
import { implementServer, resetServer } from '@/mock/server';
import { mockedPostCategoryApi, mockedPutCategoryApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';

import CategoryUpdateDialog from '@/components/category/organisms/CategoryUpdateDialog';
import categoryApi from '@/apis/categoryApi';

describe('CategoryUpdateDialog', () => {
  beforeEach(() => {
    implementServer([restHandler(mockedPutCategoryApi), restHandler(mockedPostCategoryApi)]);
  });
  it('기존 이미지가 없다면 썸네일 등록 버튼이 식별된다.', () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    const close = jest.fn();
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={''}
      />,
    );
    const backgroundThumbnailElement = screen.queryByTestId('id-thumbnail-background');
    expect(backgroundThumbnailElement).not.toBeInTheDocument();
    const uploadButton = screen.getByRole('button', {
      name: /썸네일 업로드/i,
    });
    expect(uploadButton).toBeInTheDocument();
  });

  it('기존 이미지가 있다면 썸네일 등록 UI에 미리보기 이미지가 식별된다.', () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    const close = jest.fn();
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={'/abc.jpg'}
      />,
    );
    const thumbnailImage = screen.getByRole('img', { name: 'category-thumbnail-image' });
    expect(thumbnailImage).toBeInTheDocument();
  });

  it('카테고리 수정이라면 기존 공개여부 상태가 식별되고 변경할 수 있다.', async () => {
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    const close = jest.fn();
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={'/abc.jpg'}
        isShared
      />,
    );
    const toggle = screen.getByRole('button', {
      name: /카테고리 공개여부 설정 토글/i,
    });
    expect(toggle).toHaveStyleRule('background-color', 'var(--color-brand)');
    fireEvent.click(toggle);
    expect(toggle).toHaveStyleRule('background-color', 'var(--color-gray400)');
    expect(await screen.findByText(/공개 여부: 비공개/i));
  });

  it('카테고리 등록이라면 공유 여부 토글이 식별되지 않는다.', () => {
    const close = jest.fn();
    renderQuery(<CategoryUpdateDialog categoryTitle="" visible={true} onClose={close} thumbnail="" />);
    const toggle = screen.queryByRole('button', {
      name: /카테고리 공개여부 설정 토글/i,
    });
    expect(toggle).not.toBeInTheDocument();
  });

  it('카테고리 제목을 입력하지 않고 등록하기 버튼을 클릭하면 등록되지 않고 validation text가 식별된다.', async () => {
    const close = jest.fn();
    renderQuery(<CategoryUpdateDialog categoryTitle="" visible={true} onClose={close} thumbnail="" />);
    const titleUpdateInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(titleUpdateInput).toBeInTheDocument();
    const updateButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(updateButton);
    await waitFor(() => expect(close).not.toHaveBeenCalled());
    expect(screen.getByText('제목을 2글자 이상 40글자 이하로 작성해주세요'));
  });

  it('카테고리 제목을 수정하면 모달창이 닫힌다.', async () => {
    const close = jest.fn();
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    const inputTitle = 'HELLO';
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={''}
      />,
    );
    const titleUpdateInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(titleUpdateInput).toBeInTheDocument();
    expect(titleUpdateInput).toHaveValue(title);
    fireEvent.change(titleUpdateInput, { target: { value: inputTitle } });
    const updateButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(updateButton);
    await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
  });

  it('카테고리 제목 수정 실패 시 에러 toast와 함께 모달창이 닫히지 않는다.', async () => {
    const close = jest.fn();
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 2];
    const inputTitle = 'HELLOOOOOOOOOOOOOOOOOOOOOO';
    resetServer([restHandler(mockedPutCategoryApi, { status: 400, message: '20글자가 넘으면 안됩니다.' })]);
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={''}
      />,
    );
    const titleUpdateInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(titleUpdateInput).toHaveValue(title);
    fireEvent.change(titleUpdateInput, { target: { value: inputTitle } });
    expect(titleUpdateInput).toHaveValue(inputTitle);

    const updateButton = screen.getByRole('button', {
      name: /등록하기/i,
    });
    fireEvent.click(updateButton);
    await waitFor(
      async () => {
        const text = await screen.findByText('20글자가 넘으면 안됩니다.');
        expect(text).toBeInTheDocument();
        expect(close).not.toHaveBeenCalled();
      },
      {
        timeout: 1000,
      },
    );
  });

  it('등록 버튼 클릭으로 업데이트 시 기존에 존재하던 정보라면 api 호출 없이 모달창이 닫힌다.', async () => {
    const close = jest.fn();
    const spyCategoryUpdateApi = jest.spyOn(categoryApi, 'updateCategory');
    const { categoryId, title } = MOCK_CATEGORIES[MOCK_CATEGORIES.length - 1];
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={'/abc.jpg'}
        isShared
      />,
    );
    const updateButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(updateButton);
    await waitFor(() => expect(close).toHaveBeenCalledTimes(1));
    expect(spyCategoryUpdateApi).not.toHaveBeenCalled();
  });
});
