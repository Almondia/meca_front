import Navigation from '@/components/@common/organisms/Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <Navigation />
    {children}
  </>
);
export default PageLayout;
