import dotenv from 'dotenv';
import Server from './server';

dotenv.config();

const { PORT = 3001, NODE_ENV } = process.env;

const server = new Server(Number(PORT));

const startServer = async () => {
  try {
    await server.listen();
    console.log(`App is running at http://localhost:${server.port} in ${NODE_ENV} mode`);
    console.log('Press CTRL-C to stop\n');
  } catch (error) {
    console.log('Error starting server:', error);
    process.exit(1);
  }
};

const stopServer = async () => {
  console.log('\nStopping server...');
  try {
    await server.stop();
    console.log('Server stopped successfully');
  } catch (error) {
    console.log('Error stopping server:', error);
    process.exit(1);
  } 
};

process.on('SIGTERM', async () => {
  if (server.isListening()) {
    return await stopServer();
  }

  process.exit(0);
});

startServer();
