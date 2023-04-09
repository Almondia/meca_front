import { renderQuery } from '../utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CATEGORIES } from '../__mocks__/msw/data';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { rest } from 'msw';
import { server } from '../__mocks__/msw/server';
import CategoryUpdateDialog from '@/components/molcules/CategoryUpdateDialog';

describe('CategoryUpdateDialog', () => {
  it('기존 이미지가 없다면 썸네일 등록 버튼이 식별된다.', () => {
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
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
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail={'abc.jpg'}
      />,
    );
    const backgroundThumbnailElement = screen.getByTestId('id-thumbnail-background');
    expect(backgroundThumbnailElement).toHaveStyleRule('background-image', 'url(abc.jpg)');
  });

  it('카테고리 제목을 수정하면 모달창이 닫힌다.', () => {
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
    const inputTitle = 'HELLO';
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
    const titleUpdateInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(titleUpdateInput).toBeInTheDocument();
    expect(titleUpdateInput).toHaveValue(title);
    fireEvent.change(titleUpdateInput, { target: { value: inputTitle } });
    const updateButton = screen.getByRole('button', {
      name: /수정하기/i,
    });
    fireEvent.click(updateButton);
    waitFor(() => expect(close).toHaveBeenCalledTimes(1), {
      timeout: 2000,
    });
  });

  it('카테고리 제목을 비정상적으로 수정하려고 시도하면 에러 toast와 함께 모달창이 닫히지 않는다.', async () => {
    const { categoryId, title } = CATEGORIES[CATEGORIES.length - 1];
    const inputTitle = 'HELLOOOOOOOOOOOOOOOOOOOOOO';
    const close = jest.fn();
    server.resetHandlers(
      rest.put(`${ENDPOINT}/categories/${categoryId}`, async (req, res, ctx) => {
        const { id } = req.params;
        const { title } = await req.json();
        return res(
          ctx.status(400),
          ctx.json({
            message: '20글자가 넘으면 안됩니다.',
          }),
        );
      }),
    );
    renderQuery(
      <CategoryUpdateDialog
        categoryId={categoryId}
        categoryTitle={title}
        visible={true}
        onClose={close}
        thumbnail=""
      />,
    );
    const titleUpdateInput = screen.getByRole('textbox', {
      name: 'input-category-title',
    });
    expect(titleUpdateInput).toHaveValue(title);
    fireEvent.change(titleUpdateInput, { target: { value: inputTitle } });
    expect(titleUpdateInput).toHaveValue(inputTitle);

    const updateButton = screen.getByRole('button', {
      name: /수정하기/i,
    });
    fireEvent.click(updateButton);
    waitFor(() => expect(close).toHaveBeenCalledTimes(1), {
      timeout: 1000,
    });
    waitFor(
      async () => {
        const text = await screen.findByText('20글자가 넘으면 안됩니다.');
        expect(text).toBeInTheDocument();
      },
      {
        timeout: 1000,
      },
    );
  });
});
