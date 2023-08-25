import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import { withMethodRouter } from '@/apis/nextApiWrapper/withMethodRouter';
import userApi from '@/apis/userApi';

const { DATA_SERVER } = process.env;

interface NextPostRequest extends NextApiRequest {
  body: {
    sentence: string;
  };
}

async function handleGetAllByUser(_: NextApiRequest, res: NextApiResponse) {
  const { memberId } = await userApi.getMe();
  const { data: response } = await axios.get(`${DATA_SERVER}/api/keywords/${memberId}`);
  res.status(200).json({ ...response });
}

async function handlePost(req: NextPostRequest, res: NextApiResponse) {
  const { memberId } = await userApi.getMe();
  const { sentence } = req.body;
  const { data: response } = await axios.post(`${DATA_SERVER}/api/keywords`, { sentence, userId: memberId });
  res.status(200).json({ keywords: response.keyword });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  withMethodRouter(req, res, {
    GET: handleGetAllByUser,
    POST: handlePost,
  });
};

export default withAllowedMethod(['GET', 'POST'], withHandleError(withAuthentication(handler)));
