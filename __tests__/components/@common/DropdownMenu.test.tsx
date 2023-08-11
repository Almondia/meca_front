import { render } from '../../utils';
import { screen, fireEvent } from '@testing-library/react';

import DropdownMenu from '@/components/@common/molecules/DropdownMenu';

describe('DropdownMenu', () => {
  it('Menu 클릭 시 클릭 이벤트가 발생하고 Menu가 close 된다.', async () => {
    render(
      <DropdownMenu wrapperComponent={({ onClick }) => <button onClick={onClick}>button</button>}>
        <DropdownMenu.Menu>menu</DropdownMenu.Menu>
      </DropdownMenu>,
    );
    const button = screen.getByRole('button', { name: 'button' });
    fireEvent.click(button);
    const menuLink = await screen.findByRole('link', { name: 'menu' });
    expect(menuLink).toBeInTheDocument();
    fireEvent.click(menuLink);
    expect(menuLink).not.toBeInTheDocument();
  });

  it('Menu Wrapper 버튼 외부를 클릭하면 메뉴가 close된다.', async () => {
    render(
      <>
        <h3>hello</h3>
        <DropdownMenu wrapperComponent={({ onClick }) => <button onClick={onClick}>button</button>}>
          <DropdownMenu.Menu>menu</DropdownMenu.Menu>
        </DropdownMenu>
      </>,
    );
    const button = screen.getByRole('button', { name: 'button' });
    fireEvent.click(button);
    await screen.findByRole('link', { name: 'menu' });
    const helloHeading = screen.getByRole('heading', { name: 'hello' });
    fireEvent.mouseDown(helloHeading);
    expect(screen.queryByRole('link', { name: 'menu' })).not.toBeInTheDocument();
  });

  it('Wrapper Button을 두번 클릭하면 close된다.', async () => {
    render(
      <DropdownMenu wrapperComponent={({ onClick }) => <button onClick={onClick}>button</button>}>
        <DropdownMenu.Menu>menu</DropdownMenu.Menu>
      </DropdownMenu>,
    );
    const button = screen.getByRole('button', { name: 'button' });
    fireEvent.click(button);
    await screen.findByRole('link', { name: 'menu' });
    fireEvent.click(button);
    expect(screen.queryByRole('link', { name: 'menu' })).not.toBeInTheDocument();
  });
});
