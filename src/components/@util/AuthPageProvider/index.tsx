/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from 'next/router';

import useUser from '@/hooks/user/useUser';

interface AuthPageProviderProps {
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
    return null;
  }
  return <>{children}</>;
};

export default AuthPageProvider;
