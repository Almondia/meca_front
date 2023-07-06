import { ENDPOINT } from '../handlers';

/**
 * @param {boolean} [revalidated=true]
 * @returns
 */
export const mockedPostRevalidateApi = (revalidated = true) => {
  const [uri, method] = [`/api/revalidate`, 'post'];
  const responseResolver = (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        revalidated,
      }),
    );
  };
  return { uri, method, responseResolver };
};

/**
 * @description queries: [ purpose, extension, fileName ]
 * @property {string} url - `/ENDPOINT/${purpose}/${fileName}.${extension}`
 * @property {string} objectKey - `${purpose}/${fileName}.${extension}`
 */
export const mockedGetPresignImageUrlApi = () => {
  const [uri, method] = [`${ENDPOINT}/presign/images/upload`, 'get'];
  const responseResolver = (req, res, ctx) => {
    const purpose = req.url.searchParams.get('purpose');
    const extension = req.url.searchParams.get('extension');
    const fileName = req.url.searchParams.get('fileName');
    return res(
      ctx.status(200),
      ctx.json({
        url: ENDPOINT + `/${purpose}/${fileName}.${extension}`,
        objectKey: `${purpose}/${fileName}.${extension}`,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedPutImageUploadApi = (url) => {
  const [uri, method] = ['/api/image', 'post'];
  const headers = { 'Content-Type': 'multipart/form-data' };
  const responseResolver = (_, res, ctx) => {
    return res(ctx.status(200), ctx.set(headers));
  };
  return { uri, method, responseResolver };
};

/**
 * @param {[key: string]: number} body
 * @property {Object} keywords
 */
export const mockedPostKeywords = (body) => {
  const [uri, method] = ['/api/keyword', 'post'];
  const responseResolver = (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ keywords: { ...body } }));
  };
  return { uri, method, responseResolver };
};
