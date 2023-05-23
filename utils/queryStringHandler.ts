export const parseQueryString = (url?: string): { [key: string]: string } => {
  if (!url) {
    return {};
  }
  const queryString = url.split('?')[1];
  if (!queryString) {
    return {};
  }
  const keyValuePairs = queryString.split('&');
  const params: { [key: string]: string } = {};
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });
  return params;
};

export const createQueryString = (params: Record<string, string>): string => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
};
