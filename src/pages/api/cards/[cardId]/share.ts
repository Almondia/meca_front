import { NextApiResponse } from 'next';

import { MecaByIdResponse } from '@/types/domain/meca';
import { NextPartialQueryApiRequest } from '@/types/nextApi';

import { unauthInstance } from '@/apis/config/instance';
import ApiError from '@/apis/error/ApiError';
import { INTERNAL_SERVER_ERROR } from '@/apis/error/constants';
import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import { combineUUID } from '@/utils/uuidHandler';

interface GetRequest extends NextPartialQueryApiRequest {
  query: {
    cardId: string;
    memberId: string;
  };
}

const handler = async (req: GetRequest, res: NextApiResponse) => {
  const { cardId, memberId } = req.query;
  try {
    const response = await unauthInstance.get<never, MecaByIdResponse>(`/api/v1/cards/${cardId}/share`);
    return res.status(200).json(response);
  } catch (e) {
    res.revalidate(`/mecas/${combineUUID(memberId, cardId)}`, {
      unstable_onlyGenerated: true,
    });
    if (e instanceof ApiError) {
      return res.status(e.status).json(e);
    }
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
};

export default withAllowedMethod(['GET'], withHandleError(handler));
