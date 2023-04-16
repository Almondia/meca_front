import { NextApiRequest, NextApiResponse } from 'next';

import categoryApi from '@/apis/categoryApi';
import { AxiosErrorResponse, setRequest } from '@/apis/config/instance';
import { CategoryType } from '@/types/domain';

async function handlePut(req: NextApiRequest, res: NextApiResponse<CategoryType | AxiosErrorResponse>) {
  setRequest(req);
  const { categoryId, title, thumbnail, shared }: CategoryType = await req.body;
  try {
    const result = await categoryApi.updateCategory({ categoryId, title, thumbnail, shared });
    if (result.shared) {
      res.revalidate('/');
    }
    res.status(200).json(result);
  } catch (e: any) {
    res.status(e.status).json({ message: e.message, status: e.status });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => void> = {
    PUT: handlePut,
  };

  const handleMethod = method && handlers[method];

  if (handleMethod) {
    handleMethod(req, res);
  } else {
    res.status(405).end({ message: '잘못된 http method 요청' });
  }
}
