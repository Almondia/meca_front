import Navigation from '../organisms/Navigation';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    {children}
  </>
);

export default Layout;
