import Icon from '@/components/atoms/Icon';
import { render } from '@testing-library/react';

it('Icon 컴포넌트는 MockedIcon 컴포넌트를 렌더링한다.', () => {
  const { container } = render(<Icon icon="Ax" />);
  expect(container).toHaveTextContent('Icon');
});
