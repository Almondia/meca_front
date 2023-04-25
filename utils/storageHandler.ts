import { hasBrowser } from './common';

const storage = {
  getItem: <T>(key: string, defaultValue?: T): T | undefined => {
    if (!hasBrowser) {
      return defaultValue;
    }
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : (JSON.parse(storedValue) as T);
    } catch (error) {
      return defaultValue;
    }
  },
  setItem: <T>(key: string, value: T): void => {
    if (hasBrowser()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeItem: (key: string) => {
    if (hasBrowser()) {
      localStorage.removeItem(key);
    }
  },
  clearItem: () => {
    if (hasBrowser()) {
      localStorage.clear();
    }
  },
};

export default storage;
