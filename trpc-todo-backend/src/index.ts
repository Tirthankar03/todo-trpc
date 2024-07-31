import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { todoRouter } from './todoRouter';
import { router } from './trpc';

const appRouter = router({
  todo: todoRouter,
});

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(3001);

console.log('Server running on http://localhost:3001');

export type AppRouter = typeof appRouter;