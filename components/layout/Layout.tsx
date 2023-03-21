import { useEffect } from 'react';

import { setAccessToken } from '@/apis/config/instance';
import useUser from '@/hooks/useUser';

import Navigation from '../organisms/Navigation';

export interface LayoutProps {
  accessToken: string;
  hasAuth?: boolean;
  children: React.ReactNode;
}

const Layout = ({ accessToken, hasAuth, children }: LayoutProps) => {
  const { user } = useUser(hasAuth ?? false);
  useEffect(() => {
    if (hasAuth) {
      setAccessToken(accessToken);
      return;
    }
    setAccessToken('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAuth]);
  return (
    <>
      <Navigation loginUserName={user?.name} profileImage={user?.profile} />
      {children}
    </>
  );
};

export default Layout;
