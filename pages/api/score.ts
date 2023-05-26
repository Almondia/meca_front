import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import nookies from 'nookies';

import { getJWTPayload } from '@/utils/jwtHandler';

const { DATA_SERVER } = process.env;

async function getUserIdFromRequest(req: NextApiRequest) {
  const { accessToken } = nookies.get({ req });
  if (!accessToken) {
    return undefined;
  }
  const id = getJWTPayload(accessToken, 'id');
  return id;
}

async function handleGetById(req: NextApiRequest, res: NextApiResponse) {
  const id = await getUserIdFromRequest(req);
  if (!id) {
    res.status(401).json({ message: 'unauthorized', status: 401 });
    return;
  }
  const { data: response } = await axios.get(`${DATA_SERVER}/api/scores/${id}`);
  res.status(200).json({ ...response });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const id = await getUserIdFromRequest(req);
  if (!id) {
    res.status(401).json({ message: 'unauthorized', status: 401 });
    return;
  }
  const { answer, inputValue: input }: { answer: string; inputValue: string } = await req.body;
  if (!answer || !input) {
    res.status(400).json({ message: 'bad request', status: 400 });
    return;
  }
  const { data: response } = await axios.post(`${DATA_SERVER}/api/scores`, { answer, input, userId: id });
  res.status(200).json({ ...response });
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
