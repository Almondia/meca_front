import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { Writable } from 'stream';

import axios from 'axios';
import formidable from 'formidable';
import sharp from 'sharp';

import { setRequest } from '@/apis/config/instance';

const MAX_IMAGE_WIDTH = 1080;

const FORMIDABLE_CONFIG = {
  keepExtensions: true,
  maxFileSize: 15728640,
  maxFieldsSize: 1048576,
  maxFields: 1,
  allowEmptyFiles: false,
  multiples: false,
} as const;

const formidablePromise = (
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
  new Promise((accept, reject) => {
    const form = formidable(opts);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });
  return writable;
};

const resize = async ({ buffer }: { buffer: Buffer }) => {
  let sharpImage = sharp(buffer, { animated: true });
  const { width, format } = await sharpImage.metadata();
  if (format === 'gif' || format === 'webp' || format === 'png') {
    sharpImage = sharpImage.webp();
  }
  const resizedBuffer = await sharpImage
    .resize({
      fit: sharp.fit.contain,
      width: Math.min(width ?? MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH),
    })
    .toBuffer();
  return resizedBuffer;
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  setRequest(req);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '잘못된 http method 요청', status: 405 });
  }
  try {
    const chunks: never[] = [];
    const { fields } = await formidablePromise(req, {
      ...FORMIDABLE_CONFIG,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });
    const url = fields?.url?.[0];
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: '잘못된 경로 요청', status: 400 });
    }
    const buffer = Buffer.concat(chunks);
    const resizedBuffer = await resize({ buffer });
    try {
      await axios.put(url, resizedBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
    } catch {
      return res.status(500).json({ message: '이미지 업로드 실패', status: 500 });
    }
    return res.status(200).json({ message: 'image uploaded' });
  } catch (err) {
    return res.status(400).json({ message: '이미지가 없거나 너무 큽니다!', status: 400 });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
