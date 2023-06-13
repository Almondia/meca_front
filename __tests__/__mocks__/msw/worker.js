import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const implementWorker = (restHandlers) => {
  worker.use(...restHandlers);
};

export const resetWorker = (restHandlers) => {
  worker.resetHandlers(...restHandlers);
};
