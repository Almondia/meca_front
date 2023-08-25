import { NextApiResponse } from 'next';

import { Meca, MecaCreateRequest } from '@/types/domain/meca';
import { NextPartialQueryApiRequest } from '@/types/nextApi';

import { authInstance } from '@/apis/config/instance';
import mecaApi from '@/apis/mecaApi';
import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';

interface PostRequest extends NextPartialQueryApiRequest {
  body: MecaCreateRequest;
}

const handler = async (req: PostRequest, res: NextApiResponse) => {
  const requestBody = req.body;
  const response = await authInstance.post<never, Meca>('/api/v1/cards', { ...requestBody });
  mecaApi
    .getCountByCategoryId(requestBody.categoryId)
    .then(({ count, shared }) => {
      count === 1 && shared && res.revalidate('/');
    })
    .catch(() => {});
  return res.status(200).json(response);
};

export default withAllowedMethod(['POST'], withHandleError(withAuthentication(handler)));
