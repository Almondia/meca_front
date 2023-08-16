import { renderQuery, render } from '../../utils';

import CategoryListHeader from '@/components/category/organisms/CategoryListHeader';
import { screen, fireEvent } from '@testing-library/react';

describe('CategoryListHeader', () => {
  it('주어진 Title이 식별된다.', () => {
    render(<CategoryListHeader pageTitle="Page Title" />);
    expect(screen.getByRole('heading', { name: 'Page Title' }));
    expect(screen.queryByRole('button', { name: /추가하기/i })).not.toBeInTheDocument();
  });

  it('추가하기 버튼이 있다면 클릭할 경우 카테고리 추가 모달창이 식별된다.', async () => {
    renderQuery(<CategoryListHeader pageTitle="Title" hasAddButton />);
    const addButton = screen.getByRole('button', { name: /추가하기/i });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    const dialogTitle = await screen.findByText('카테고리 추가하기');
    expect(dialogTitle).toBeInTheDocument();
  });
});
