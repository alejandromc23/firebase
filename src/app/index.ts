import dotenv from 'dotenv';

import { Server } from './server';

dotenv.config();

const server = new Server(Number(process.env.PORT) || 3000);

const httpApp = server.listen().then(() => {
  console.log(
    `  App is running at http://localhost:${server.port} in ${process.env.NODE_ENV} mode`
  );
  console.log('  Press CTRL-C to stop\n');
});

process.on('SIGINT', () => {
  console.log('\n  Stopping server...');
  httpApp.then(() => {
    server.stop().then(() => {
      process.exit();
    });
  });
});
