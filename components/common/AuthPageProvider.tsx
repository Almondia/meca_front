/* eslint-disable react/jsx-no-useless-fragment */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import useUser from '@/hooks/user/useUser';

const Unauthorized = dynamic(() => import('@/pages/401'));

export interface AuthPageProviderProps {
  children: React.ReactNode;
  reload?: boolean;
}

const AuthPageProvider = ({ children, reload }: AuthPageProviderProps) => {
  const { user } = useUser();
  const router = useRouter();
  if (!user && reload) {
    router.reload();
    return null;
  }
  if (!user) {
    return <Unauthorized />;
  }
  return <>{children}</>;
};

export default AuthPageProvider;
