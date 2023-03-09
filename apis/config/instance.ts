import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const unauthInstance = axios.create({ baseURL });
const authInstance = axios.create({ baseURL });

authInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

unauthInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

authInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // TODO add token refresh logic
    if (error.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  },
);
export { unauthInstance, authInstance };
