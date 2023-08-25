/* istanbul ignore file */
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { Writable } from 'stream';

import axios from 'axios';
import formidable from 'formidable';
import sharp from 'sharp';

import { ImageUploadRequest } from '@/types/domain';

import imageApi from '@/apis/imageApi';
import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const { url, objectKey } = await imageApi.getPresignedUrl({ purpose, extension, fileName });
    const resizedBuffer = await resize({ buffer });
    await axios.put(url, resizedBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    return res.status(200).json({ uploadedImageUrl: objectKey });
  } catch (err) {
    return res.status(400).json({ message: '이미지 정보가 올바르지 않거나 너무 큽니다', status: 400 });
  }
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default withAllowedMethod(['POST'], withHandleError(withAuthentication(handler)));
