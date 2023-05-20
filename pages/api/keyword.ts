import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import nookies from 'nookies';

import { getJWTPayload } from '@/utils/jwtHandler';

const { DATA_SERVER } = process.env;

function getUserIdFromRequest(req: NextApiRequest) {
  const { accessToken } = nookies.get({ req });
  if (!accessToken) {
    return undefined;
  }
  return getJWTPayload(accessToken, 'id');
}

async function handleGetById(req: NextApiRequest, res: NextApiResponse) {
  const id = getUserIdFromRequest(req);
  if (!id) {
    res.status(401).json({ message: 'unauthorized', status: 401 });
    return;
  }
  const response = await axios.get(`${DATA_SERVER}/api/keywords/${id}`).then((r) => r.data);
  res.status(200).json({
    ...response,
  });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const id = getUserIdFromRequest(req);
  if (!id) {
    res.status(401).json({ message: 'unauthorized', status: 401 });
    return;
  }
  const { sentence }: { sentence: string } = await req.body;
  if (!sentence || typeof sentence !== 'string') {
    res.status(400).json({ message: 'bad request', status: 400 });
    return;
  }
  const response = await axios
    .post(`${DATA_SERVER}/api/keywords`, {
      sentence,
      userId: id,
    })
    .then((r) => r.data);
  res.status(200).json({ keywords: response.keyword });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => void> = {
    GET: handleGetById,
    POST: handlePost,
  };
  const handleMethod = method && handlers[method];
  if (handleMethod) {
    handleMethod(req, res);
  } else {
    res.status(405).json({ message: '잘못된 http method 요청', status: 405 });
  }
}
