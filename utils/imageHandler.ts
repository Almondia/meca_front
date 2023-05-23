const REMOTE_IMAGE_URL = process.env.NEXT_PUBLIC_REMOTE_IMAGE_URL ?? '';

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

export const getRemoteImageUrl = (imageSrc: string) =>
  REMOTE_IMAGE_URL ? `${REMOTE_IMAGE_URL}/${imageSrc}` : imageSrc;

export const getOriginImageSize = (image: File | string): Promise<{ width: number; height: number }> => {
  const url = typeof image === 'string' ? image : URL.createObjectURL(image);
  return new Promise((resolve) => {
    const imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.onload = () => {
      resolve({ width: imageElement.naturalWidth, height: imageElement.naturalHeight });
    };
  });
};
