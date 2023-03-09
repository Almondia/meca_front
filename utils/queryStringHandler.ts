import { hasBrowser } from './common';

const getParam = (key: string) => {
  if (!hasBrowser()) {
    return '';
  }
  const params = new URLSearchParams(window.location.search);
  return params.get(key) ?? '';
};

export default getParam;
