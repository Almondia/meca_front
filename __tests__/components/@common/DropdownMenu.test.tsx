import { render } from '../../utils';
import { screen, fireEvent } from '@testing-library/react';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';

describe('DropdownMenu', () => {
  it('Opener 내부 클릭 시 클릭 이벤트가 발생하고 Opener가 close 된다.', () => {
    const mockClick = jest.fn();
    render(
      <DropdownMenu name="name">
        <button onClick={mockClick}>hello</button>
      </DropdownMenu>,
    );
    const dotButton = screen.getByRole('button', { name: /verticaldot/i });
    fireEvent.click(dotButton);
    const helloButton = screen.getByRole('button', { name: 'hello' });
    expect(helloButton).toBeInTheDocument();
    fireEvent.click(helloButton);
    expect(mockClick).toBeCalledTimes(1);
    expect(helloButton).not.toBeInTheDocument();
  });

  it('Opener 외부를 클릭하면 Opener가 close 된다.', async () => {
    const mockClick = jest.fn();
    render(
      <div>
        <p onClick={mockClick}>hello</p>
        <DropdownMenu name="name">
          <h3>inner</h3>
        </DropdownMenu>
      </div>,
    );
    const dotButton = screen.getByRole('button', { name: /verticaldot/i });
    fireEvent.click(dotButton);
    const innerHeading = screen.getByRole('heading', { name: 'inner' });
    expect(innerHeading).toBeInTheDocument();
    const helloText = screen.getByText('hello');
    fireEvent.mouseDown(helloText);
    expect(innerHeading).not.toBeInTheDocument();
  });

  it('Opener Dot Button을 두번 클릭하면 close된다.', () => {
    render(
      <DropdownMenu name="name">
        <p>hello</p>
      </DropdownMenu>,
    );
    const dotButton = screen.getByRole('button', { name: /verticaldot/i });
    fireEvent.click(dotButton);
    const helloText = screen.getByText('hello');
    expect(helloText).toBeInTheDocument();
    fireEvent.click(dotButton);
    expect(helloText).not.toBeInTheDocument();
  });
});
