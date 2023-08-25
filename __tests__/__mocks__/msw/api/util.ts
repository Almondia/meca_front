import { ENDPOINT, ResponseResolver } from '../handlers';

export const mockedPostRevalidateApi = (revalidated = true) => {
  const [uri, method] = [`/api/revalidate`, 'post'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        revalidated,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedGetPresignImageUrlApi = () => {
  const [uri, method] = [`${ENDPOINT}/presign/images/upload`, 'get'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
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

export const mockedPutImageUploadApi = () => {
  const [uri, method] = ['/api/image', 'post'];
  const responseResolver: ResponseResolver = async (req, res, ctx) => {
    req.headers.set('content-type', 'multipart/form-data');
    //@ts-ignore
    const image = req._body.get('file');
    return res(
      ctx.status(200),
      ctx.json({
        uploadedImageUrl: image.name,
      }),
    );
  };
  return { uri, method, responseResolver };
};

export const mockedPostKeywords = (body: { [key: string]: number }) => {
  const [uri, method] = ['/api/keywords', 'post'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ keywords: { ...body } }));
  };
  return { uri, method, responseResolver };
};
