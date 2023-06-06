import { setupServer } from 'msw/node';

import { handlers, restHandler } from './handlers';

export const server = setupServer(...handlers);
server.listen({ port: 4000 });

export const implementServer = (restHandlers) => {
  server.use(...restHandlers);
};

export const resetServer = (restHandlers) => {
  server.resetHandlers(...restHandlers);
};
