const REMOTE_IMAGE_URL = 'https://my-meca.s3.ap-northeast-2.amazonaws.com';

export const extractAllImageSrc = (htmlString: string, remoteUrl?: string): string[] | undefined => {
  const regex = new RegExp(
    `<img\\s+[^>]*src\\s*=\\s*['"](?=.*${remoteUrl ?? REMOTE_IMAGE_URL})([^'"]*)['"][^>]*>`,
    'gi',
  );
  const matchedLength = htmlString.match(regex)?.length ?? 0;
  if (matchedLength === 0) {
    return undefined;
  }
  return [...Array(matchedLength)].reduce((prev) => {
    const result = regex.exec(htmlString);
    return result ? prev.concat(result[1]) : prev;
  }, []);
};

export const extractFirstImageSrc = (htmlString: string, remoteUrl?: string) => {
  const regex = new RegExp(
    `<img\\s+[^>]*src\\s*=\\s*['"](?=.*${remoteUrl ?? REMOTE_IMAGE_URL})([^'"]*)['"][^>]*>`,
    'gi',
  );
  return regex.exec(htmlString)?.[1];
};
