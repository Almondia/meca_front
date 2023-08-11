import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { Writable } from 'stream';

import axios from 'axios';
import formidable from 'formidable';
import nookies from 'nookies';
import sharp from 'sharp';

import { ImageUploadRequest } from '@/types/domain';

import { setAccessTokenFromServerRequest } from '@/apis/config/instance';
import imageApi from '@/apis/imageApi';
import { getJWTPayload } from '@/utils/jwtHandler';

const MAX_IMAGE_WIDTH = 1080;

const FORMIDABLE_CONFIG = {
  keepExtensions: true,
  maxFileSize: 15728640,
  maxFieldsSize: 1048576,
  maxFields: 4,
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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '잘못된 http method 요청', status: 405 });
  }
  const { accessToken } = nookies.get({ req });
  if (!accessToken && !getJWTPayload(accessToken, 'id')) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }
  try {
    const chunks: never[] = [];
    const { fields } = await formidablePromise(req, {
      ...FORMIDABLE_CONFIG,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });
    const { purpose: purposes, extension: extensions, fileName: fileNames } = fields;
    const { purpose, extension, fileName } = {
      purpose: purposes[0],
      extension: extensions[0],
      fileName: fileNames[0],
    } as ImageUploadRequest;
    const buffer = Buffer.concat(chunks);
    setAccessTokenFromServerRequest(accessToken);
    const { url, objectKey } = await imageApi.getPresignedUrl({ purpose, extension, fileName });
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
    return res.status(200).json({ uploadedImageUrl: objectKey });
  } catch (err) {
    return res.status(400).json({ message: '이미지 정보가 올바르지 않거나 너무 큽니다', status: 400 });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
