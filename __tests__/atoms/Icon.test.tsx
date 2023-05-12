import Icon from '@/components/common/Icon';
import { render } from '@testing-library/react';

it('Icon 컴포넌트는 Icon text를 가지는 MockedIcon 컴포넌트를 렌더링한다.', () => {
  const { container } = render(<Icon icon="Ax" />);
  expect(container).toHaveTextContent('Ax');
});
