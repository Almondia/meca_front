import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import { setAccessTokenFromServerRequest } from '@/apis/config/instance';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import userApi from '@/apis/userApi';
import logger from '@/libs/logger';
import { UUID_PATTERN } from '@/utils/constants';

const isAvailableUrlValidators: ((url: string, additionalUrlMatcher?: string) => boolean)[] = [
  (url) => url === '/',
  (url, additionalMatcher = '') =>
    !!url.match(new RegExp(`^\\/mecas\\/${UUID_PATTERN}-${UUID_PATTERN}$`, 'i')) &&
    url.indexOf(additionalMatcher) !== -1,
];

const validRevalidationStrategy: Record<'public' | 'private', (urls: string[], secret?: any) => Promise<boolean>> = {
  private: async (urls) => {
    try {
      const { memberId } = await userApi.getMe();
      logger.info({
        requestType: 'API',
        location: '/api/revalidate',
        tag: 'SUCCESS',
        message: `'${memberId}' attempted revalidation for the page '${urls.reduce((p, c) => p.concat(`,${c}`))}'`,
      });
      return urls.reduce(
        (prev, url) => prev || isAvailableUrlValidators.some((validFn) => validFn(url, memberId)),
        false,
      );
    } catch (e) {
      return false;
    }
  },
  public: async (urls, secret) => {
    if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      return false;
    }
    return urls.reduce((prev, url) => prev || isAvailableUrlValidators.some((validFn) => validFn(url)), false);
  },
};

const revalidate = async (url: string, res: NextApiResponse) => {
  await res.revalidate(url, { unstable_onlyGenerated: true });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = nookies.get({ req });
  setAccessTokenFromServerRequest(accessToken);
  const { urls, type }: { urls: string[]; type: 'private' | 'public' | undefined } = await req.body;
  const isValidRequest = await validRevalidationStrategy[type ?? 'private'](urls, req.query.secret);
  if (!isValidRequest) {
    return res.status(304).json({ message: 'not revalidated', status: 304 });
  }
  const revalidatePromise = urls.map((url) => revalidate(url, res));
  await Promise.all(revalidatePromise);
  return res.status(200).json({ revalidated: true });
};

export default withHandleError(handler);
