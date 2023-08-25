import { NextApiResponse } from 'next';

import { Category, CategoryUpdateRequest } from '@/types/domain/category';
import { NextPartialQueryApiRequest } from '@/types/nextApi';

import { authInstance } from '@/apis/config/instance';
import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import { withMethodRouter } from '@/apis/nextApiWrapper/withMethodRouter';

interface PutRequest extends NextPartialQueryApiRequest {
  query: {
    categoryId: string;
  };
  body: Omit<CategoryUpdateRequest, 'categoryId'> & { prevShared?: boolean };
}

interface DeleteRequest extends NextPartialQueryApiRequest {
  query: {
    categoryId: string;
    shared?: string;
  };
}

const handlePutById = async (req: PutRequest, res: NextApiResponse) => {
  const { categoryId } = req.query;
  const { title, thumbnail, shared, prevShared } = req.body;
  const response = await authInstance.put<never, Category>(`/api/v1/categories/${categoryId}`, {
    title,
    thumbnail,
    shared,
  });
  if (shared || (prevShared ?? false) !== shared) {
    res.revalidate('/');
  }
  return res.status(200).json(response);
};

const handleDeleteById = async (req: DeleteRequest, res: NextApiResponse) => {
  const { categoryId, shared } = req.query;
  await authInstance.delete<never, never>(`/api/v1/categories/${categoryId}`);
  shared && res.revalidate('/');
  return res.status(200).json({ deleted: true });
};

const handler = async (req: PutRequest | DeleteRequest, res: NextApiResponse) =>
  withMethodRouter(req, res, {
    PUT: handlePutById,
    DELETE: handleDeleteById,
  });

export default withAllowedMethod(['PUT', 'DELETE'], withHandleError(withAuthentication(handler)));
