import { render } from '../utils';
import Button from '@/components/atoms/Button';
import 'jest-styled-components';
import { COLOR } from '@/styles/constants';
import { fireEvent } from '@testing-library/react';

/** 이 테스트를 통과하면 Styled-Components ThemeProvider가 jest 환경에 잘 적용된 것입니다. */
it('primary theme 버튼은 primary color를 가지고 있다.', () => {
  const { getByRole } = render(
    <Button colorTheme="primary" onClick={jest.fn()}>
      hello
    </Button>,
  );
  expect(getByRole('button')).toHaveStyleRule('background-color', COLOR.brand1);
});

it('button을 클릭하면 click 이벤트가 동작한다.', () => {
  const mockOnClick = jest.fn();
  const { getByRole } = render(
    <Button colorTheme="primary" onClick={mockOnClick}>
      hello
    </Button>,
  );
  fireEvent.click(getByRole('button'));
  expect(mockOnClick).toHaveBeenCalled();
});
