import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { SOCIAL_TYPES, SocialType } from '@/types/domain';
import parseQueryString from '@/utils/queryStringHandler';
import userApi from '@/apis/userApi';
import storage from '@/utils/storageHandler';
import alertToast from '@/utils/toastHandler';

const isSocialType = (value: any): value is SocialType => SOCIAL_TYPES.includes(value);

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router) {
      return;
    }
    const { asPath } = router;
    const { auth, code } = parseQueryString(asPath);
    if (!isSocialType(auth) || !code) {
      router.replace('/');
      return;
    }
    (async () => {
      const tokenResponse = await userApi[`${auth}Login`](code);
      storage.setItem('token', tokenResponse);
      alertToast('로그인 성공', 'success');
      router.replace('/');
    })();
  }, [router]);
  return (
    // TODO: 로딩 화면 구성할 것
    <div>please wait...</div>
  );
};

export default Login;
