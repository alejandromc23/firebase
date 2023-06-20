// import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
// import { getFirestore, DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';
//
// import serviceAccount from '../firebase-key.json';
//
// initializeApp({
//   credential: cert(serviceAccount as ServiceAccount)
// });
//
// const db = getFirestore();
//
// (async () => {
//   const snapshot: QuerySnapshot = await db.collection('users').get();
//   snapshot.forEach((doc: DocumentSnapshot) => {
//     console.log(doc.id, '=>', doc.data());
//   });
// })();
//

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
