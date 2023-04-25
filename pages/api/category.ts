import { NextApiRequest, NextApiResponse } from 'next';

import categoryApi from '@/apis/categoryApi';
import { AxiosErrorResponse, setRequest } from '@/apis/config/instance';
import { CategoryType } from '@/types/domain';

async function handlePut(req: NextApiRequest, res: NextApiResponse<CategoryType | AxiosErrorResponse>) {
  const { categoryId, title, thumbnail, shared, prevShared }: CategoryType & { prevShared: boolean } = await req.body;
  try {
    const result = await categoryApi.updateCategory({ categoryId, title, thumbnail, shared });
    if (prevShared !== shared || result.shared) {
      res.revalidate('/');
    }
    res.status(200).json(result);
  } catch (e: any) {
    res.status(e.status).json({ message: e.message, status: e.status });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<never | AxiosErrorResponse>) {
  const { id, shared } = req.query;
  try {
    if (typeof id !== 'string' || typeof shared !== 'string') {
      res.status(400).json({ message: 'invalid type', status: 400 });
      return;
    }
    await categoryApi.deleteCategory(id);
    if (shared === 'true') {
      res.revalidate('/');
    }
    res.status(200).end();
  } catch (e: any) {
    res.status(e.status).json({ message: e.message, status: e.status });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => void> = {
    PUT: handlePut,
    DELETE: handleDelete,
  };

  const handleMethod = method && handlers[method];

  if (handleMethod) {
    setRequest(req);
    handleMethod(req, res);
  } else {
    res.status(405).end({ message: '잘못된 http method 요청' });
  }
}
