import useUser from '@/hooks/useUser';

import Navigation from '../organisms/Navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <>
      <Navigation loginUserName={user?.name} profileImage={user?.profile} />
      {children}
    </>
  );
};

export default Layout;
