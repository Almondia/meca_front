import { NextApiResponse } from 'next';

import { Meca, MecaUpdateRequest } from '@/types/domain/meca';
import { NextPartialQueryApiRequest } from '@/types/nextApi';

import { authInstance } from '@/apis/config/instance';
import mecaApi from '@/apis/mecaApi';
import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import { withMethodRouter } from '@/apis/nextApiWrapper/withMethodRouter';
import { combineUUID } from '@/utils/uuidHandler';

interface PutRequest extends NextPartialQueryApiRequest {
  query: {
    cardId: string;
  };
  body: Omit<MecaUpdateRequest, 'cardId'>;
}

interface DeleteRequest extends NextPartialQueryApiRequest {
  query: {
    cardId: string;
    categoryId?: string;
  };
}

const handlePutById = async (req: PutRequest, res: NextApiResponse) => {
  const { cardId } = req.query;
  const requestBody = req.body;
  const response = await authInstance.put<never, Meca>(`/api/v1/cards/${cardId}`, requestBody);
  res.revalidate(`/mecas/${combineUUID(response.memberId, cardId)}`, { unstable_onlyGenerated: true });
  return res.status(200).json(response);
};

const handleDeleteById = async (req: DeleteRequest, res: NextApiResponse) => {
  const { cardId, categoryId } = req.query;
  await authInstance.delete<never, never>(`/api/v1/cards/${cardId}`);
  categoryId &&
    mecaApi.getCountByCategoryId(categoryId).then(({ count, shared }) => {
      count === 0 && shared && res.revalidate('/');
    });
  return res.status(200).json({ deleted: true });
};

const handler = async (req: PutRequest | DeleteRequest, res: NextApiResponse) =>
  withMethodRouter(req, res, {
    PUT: handlePutById,
    DELETE: handleDeleteById,
  });

export default withAllowedMethod(['PUT', 'DELETE'], withHandleError(withAuthentication(handler)));
